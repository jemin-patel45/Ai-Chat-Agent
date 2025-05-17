import mongoose from 'mongoose';


function connect() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("conected to database");

    }).catch(err => {
        console.log(err);

    })
}

export default connect;