import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGODB_URL= process.env.MONGODB_URL;
    const instance=await  mongoose.connect(MONGODB_URL)
    // console.log(   ` Mongodb connected :${instance.connection.host}` )
    console.log(   ` Mongodb connected ` ,instance.connection.host )

}