import {Schema,model} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    gender : {type: String, enum:["male","female"], required: true},
    avatar: {type: String, required: true},
},{ timestamps: true });

userSchema.pre("save",async function(){
    let hashedPassword= await bcrypt.hash(this.password,10)
    this.password=hashedPassword
 })

 userSchema.methods.comparePassword= async function(enteredPassword){
     return await bcrypt.compare(enteredPassword,this.password)
 }
export default model("User", userSchema);
