import {app,server} from "./socket/socket.js"
import express from 'express';
import {connectDB} from './db/connect1.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

connectDB();

const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials:true
    }
))



//! routes
import userRoutes from './routes/userRoute.js';
import messageRoutes from './routes/messageRoute.js';
app.use("/api/v1/message",messageRoutes)
app.use("/api/v1/user",userRoutes)

//!middlewares
import {errorMiddleware} from './middlewares/error.middleware.js';
app.use(errorMiddleware);

server.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Server is running on port 7000")
    }
})