import userModel from '../models/user.model.js';
import * as userSevices from '../services/user.service.js';
import {validationResult} from 'express-validator';
import { createUser } from '../services/user.service.js';
import redisClient from '../services/redis.service.js';


export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user = await createUser(req.body);

        const token = await user.generateJWT();
        delete user._doc.password;
        // res.send(user);
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginUserController = async (req, res) => {  
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        try{
            const{email,password} = req.body;
            const user = await userModel.findOne({email}).select('+password');
            if(!user){
               return res.status(401).json({
                    errors: 'Invalid credentials'
                })
            }
            const match = await user.isValidPassword(password);

            if(!match){
                return res.status(401).json({
                    errors: 'Invalid credentials'
                })
            }

            const token = await user.generateJWT();
            res.status(200).send({user,token});

        }catch(errr){
            return res.status(400).send(error.message);
        }
}

export const profileController = async (req, res) => {

    console.log(req.user);
    res.status(200).json({
        user:req.user
    })
    
}

// export const logoutController = async (req, res) => {
//     try {
//         const token = req.cookies.token || req.headers.authorization.split(' ')[1];

//         redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
//         await redisClient.set(token, 'logout');
//         res.clearCookie('token');
//         res.status(200).send('Logout successfully');
//     } catch (error) {   
//         res.status(400).send(error.message);
//     }
// }


export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).send('No token provided');
        }

        await redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.clearCookie('token');
        res.status(200).send('Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).send(error.message || 'Internal server error');
    }
};





// export const logoutController = async (req, res) => {
//     try {

//         const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

//         redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

//         res.status(200).json({
//             message: 'Logged out successfully'
//         });


//     } catch (err) {
//         console.log(err);
//         res.status(400).send(err.message);
//     }
// }

export const getAllUsers = async (req, res) => {
    try{
        const loggedInUser = await userModel.findOne({
            email:req.user.email
        });
        const allUsers = await userSevices.getAllUsers({userId:loggedInUser._id});

        return res.status(200).json({
            users:allUsers
        });
    }catch(err){
        console.log(err);
        res.status(400).json({error:err.message})        
    }
}


// export const profileController = async (req, res) => {
//     try {
//         const user = await userModel.findById(req.user._id).select('-password');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };