import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGODB_URL);

const mdb = mongoose.connection;

mdb.on('connected',()=>{
    console.log('MongoDb Connection Successful');
});

mdb.on('disconnected',()=>{
    console.log('MongoDb Connection Disconnected');
})

mdb.on('error',(error)=>{
    console.error('Connection Error to the Database - '+error);
})

export default mdb