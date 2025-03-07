import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./messageThunk";


const initialState={
    buttonLoading:false,
    screenLoading:false,
    messages:[]
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
      setNewMessages:(state,action)=>{
        const oldMessages=state.messages ?? [];
        state.messages=[...oldMessages,action?.payload]
      }
      
    },
    extraReducers:(builder)=>{

        //! send Message
        builder.addCase(sendMessageThunk.fulfilled,(state,action)=>{
           
         state.messages=[...state.messages,action.payload?.message]
            state.buttonLoading=false
        })
        builder.addCase(sendMessageThunk.pending,(state)=>{
            state.buttonLoading=true
        })
        builder.addCase(sendMessageThunk.rejected,(state)=>{
            state.buttonLoading=false
        })
        
        //!get Message
        builder.addCase(getMessageThunk.fulfilled,(state,action)=>{
          
            state.messages=action.payload?.messages || []
            
        })
        builder.addCase(getMessageThunk.pending,(state)=>{
            state.buttonLoading=true
        })
        builder.addCase(getMessageThunk.rejected,(state)=>{
            state.buttonLoading=false
        })
   
    }
})

export const { setNewMessages} = messageSlice.actions;
export default messageSlice.reducer;