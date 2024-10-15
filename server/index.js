import express from 'express';
const app = express();

import dotenv from 'dotenv'
dotenv.config({path:'.env'});

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

import cors from 'cors';
import mdb from './src/Config/db.js';

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(express.static('./src/public'));


//Default or Home Route
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/src/View/index.html'));
});




app.listen(PORT, ()=>{
    console.log("Server is Running on Port = "+PORT);
});