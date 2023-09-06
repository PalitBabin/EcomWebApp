import express from 'express';
import { RTCPeerConnection } from './database/db.js';
import dotenv from 'dotenv';
import DefaultData from './default.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './route/route.js'
import Razorpay from 'razorpay';
const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();

app.use("/",Router)
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

RTCPeerConnection(USERNAME,PASSWORD);

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_KEY_SECRET,
  });


  app.get("/getkey",(req,res)=>{
    try{
        res.status(200).json({key:process.env.RAZORPAY_API_KEY_ID})
    }catch(error){
        res.status(500).json(error.message)
    }
  })
app.listen(process.env.PORT,()=>console.log(`Server is running successfully on PORT ${process.env.PORT}`));

DefaultData();