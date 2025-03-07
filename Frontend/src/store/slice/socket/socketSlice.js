import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"

const initialState={
    socket:null,
    onlineUsers:null,
}

export const socketSlice=createSlice({
name:"socket",
initialState,
reducers:{
  iniitializeSocket:(state,action)=>{
    const socket = io(import.meta.env.VITE_DB_ORIGIN,{
        query:{
            userId:action?.payload
        }
    })
    state.socket=socket

   
  },
   setOnlineUser:(state,action)=>{
       state.onlineUsers=action.payload
   }
}
})

export const {iniitializeSocket ,setOnlineUser}=socketSlice.actions
export default socketSlice.reducer