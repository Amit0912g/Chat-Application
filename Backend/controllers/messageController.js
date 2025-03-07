import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import {getSocketId, io} from "../socket/socket.js"

export const sendMessage = asyncHandler(async (req, res,next) => {

    const myID = req.user.id;
    const receiverID = req.params.receiverID;
    const message=req.body.message;

    if (!message || !myID || !receiverID) {
        return next(new errorHandler("Please fill all fields", 400)); 
    }
    let conversation=await Conversation.findOne({participants:{$all:[myID,receiverID]}});
    if(!conversation){
        conversation=await Conversation.create({participants:[myID,receiverID]});
    }
    let newMessage=await Message.create({senderId:myID,receiverId:receiverID,message:message});
  
   if(newMessage){
       conversation.messages.push(newMessage.id);
       await conversation.save();}
       //!socet.io
      const socketId=getSocketId(receiverID)
       io.to(socketId).emit("newMessage",newMessage)

       res.status(200).json({success:true,message:newMessage});
})

export const getMessages = asyncHandler(async (req, res,next) => {
    const myID = req.user.id;
    const receiverID = req.params.receiverID;
    if (!myID || !receiverID) {
        return next(new errorHandler("Please fill all fields", 400)); 
    }
    let conversation=await Conversation.findOne({participants:{$all:[myID,receiverID]}}).populate("messages");
    if(!conversation){
        return res.status(200).json({ success: true, messages: [] });; 
    }
    res.status(200).json({success:true,messages:conversation.messages || []});
})