import User from "../models/userModel.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import errorHandler from "../utilities/errorHandler.js";
import { generateToken } from "../utilities/generateToken.js";

export const register = asyncHandler(async (req, res, next) => {
  const { username, fullName, gender, password } = req.body;
  if (!username || !fullName || !gender || !password) {
    return next(new errorHandler("Please fill all fields", 400));
  }
  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }
  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;
  const newUser = await User.create({
    username,
    fullName,
    password,
    gender,
    avatar,
  });
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

export const Login = asyncHandler( async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new errorHandler("Please fill all fields", 400));
  }
  const Finduser = await User.findOne({ username });
  if (!Finduser) {
    return next(new errorHandler("Please enter a valid username", 400));
  }

  let isMatch = await Finduser.comparePassword(password);
  if (!isMatch) {
    return next(new errorHandler("Invalid Password", 400));
  }
  let tokenData = {
    id: Finduser._id,
  };
  let token = await generateToken(tokenData);
  res
    .status(200)
    .cookie("myCookie", token, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: Finduser,
    });
});

export const getProfile = asyncHandler(async (req, res, next) => {
   
    const getUser= req.user.id;
    const findUser= await User.findById(getUser);
    if(!findUser){
        return next(new errorHandler("User not found",404));
    }  
    res.status(200).json({
        success: true,
        message:findUser
       
    });
})

export const getOtherProfile = asyncHandler(async (req, res, next) => {
   
  
  const findOtherUser= await User.find({_id:{$ne:req.user.id}});
  if(!findOtherUser){
      return next(new errorHandler("User not found",404));
  }  
  res.status(200).json({
      success: true,
      message:findOtherUser
     
  });
})

export const logout=asyncHandler(async(req,res,next)=>{
    res.clearCookie("myCookie","",{
        maxAge:0,
    });
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
})