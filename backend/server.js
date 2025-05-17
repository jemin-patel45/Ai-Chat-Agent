// dotenv.config();
import dotenv from 'dotenv/config';
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import  jwt  from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
import { generateResult } from './services/ai.service.js';


const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*'
    }
});

io.use(async(socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }

        // socket.project = await projectModel.findById(projectId).lean();
        socket.project = await projectModel.findById(projectId)

        if (!token) {
            return next(new Error('Authoration error'))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new Error('Authoration error'))
        }

        socket.user = decoded;
        next();

    } catch (error) {
        next(error);
    }
})


// io.on('connection', socket => {
//     socket.roomId = socket.project._id.toString();

//     console.log('a user conected');
    
    

//     socket.join(socket.roomId);

//     socket.on('project-message', async data=>{
        
//         // console.log(data);
        
//         const message = data.message;
//         const aiIsPresentInMessage = message.includes('@ai')
//         socket.broadcast.to(socket.roomId).emit('project-message', data);
//         if(aiIsPresentInMessage){
//             const prompt = message.replace('@ai','');
//             const result =await generateResult(prompt)
//             io.to(socket.roomId).emit('project-message',{
//                 message: result,
//                 sender:{
//                     _id:'ai',
//                     email:'AI'
//                 }
//             })
//             return;
//         }
        

//     })

//     socket.on('event', data => { /* … */ });
//     socket.on('disconnect', () => { 
//         console.log('user disconnected');
//         socket.leave(socket.roomId)
        
//      });
// });

io.on('connection', socket => {
    socket.roomId = socket.project._id.toString();

    console.log('a user conected');

    socket.join(socket.roomId);

    socket.on('project-message', async data => {

        const message = data.message;
        const aiIsPresentInMessage = message.includes('@ai');
        socket.broadcast.to(socket.roomId).emit('project-message', data);
        if (aiIsPresentInMessage) {
            const prompt = message.replace('@ai', '');
            const result = await generateResult(prompt);
            let messageToSend = "";
            try {
                messageToSend = JSON.stringify(result);
            } catch (error) {
                console.error("Error stringifying AI result:", error);
                messageToSend = JSON.stringify({text:"There was an error processing the AI response."});
            }

            io.to(socket.roomId).emit('project-message', {
                message: messageToSend,
                sender: {
                    _id: 'ai',
                    email: 'AI'
                }
            });
            return;
        }

    });

    // socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.leave(socket.roomId);

    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})