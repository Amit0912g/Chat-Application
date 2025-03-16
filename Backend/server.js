import {app,server} from "./socket/socket.js"
import express from 'express';
import {connectDB} from './db/connect1.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();
connectDB();
const PORT = process.env.PORT ;
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
   process.env.CLIENT_URL,  
    "https://web-chat-sandy.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));



//! routes
import userRoutes from './routes/userRoute.js';
import messageRoutes from './routes/messageRoute.js';
app.use("/api/v1/message",messageRoutes)
app.use("/api/v1/user",userRoutes)

//!middlewares
import {errorMiddleware} from './middlewares/error.middleware.js';
app.use(errorMiddleware);

server.listen(allowedOrigins,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Server is running on port 7000")
    }
})