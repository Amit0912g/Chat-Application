
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utilities/asyncHandler.js';
import User from '../models/userModel.js';

export const authentication= asyncHandler(async(req,res,next)=>{

    let cookie=req?.cookies?.myCookie || req.headers["authorization"]?.replace("Bearer ","");
    
    if(!cookie){
        return next(new Error("Please login first",401));
    }
    let decodeCookie=jwt.verify(cookie,process.env.JWT_SECRET);
    let findUser=await User.findById(decodeCookie.id);
    if(!findUser){
        return next(new Error("User not found",404));
    }
    req.user=findUser;
    next();
    
})