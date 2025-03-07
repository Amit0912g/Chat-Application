import { createSlice } from "@reduxjs/toolkit";
import { getOtherUserProfileThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk } from "./userThunk";

const initialState={
 isAuthenticated:false,
 userProfile:null,
 buttonLoading:false,
 screenLoading:true,
 otherUser:[],
 selectedUser:JSON.parse(localStorage.getItem("selectedUser"))
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setSelectedUser:(state,action)=>{
        localStorage.setItem("selectedUser",JSON.stringify(action.payload))
        state.selectedUser=action.payload
      }
      
    },
    extraReducers:(builder)=>{

        //! login user
        builder.addCase(loginUserThunk.fulfilled,(state,action)=>{
            state.userProfile=action.payload?.user
            state.isAuthenticated=true

            state.buttonLoading=true
        })
        builder.addCase(loginUserThunk.pending,(state)=>{
            state.buttonLoading=false
        })
        builder.addCase(loginUserThunk.rejected,(state)=>{
            state.buttonLoading=false
        })

        //! register user

         builder.addCase(registerUserThunk.fulfilled,(state,action)=>{
            state.userProfile=action.payload?.user
            state.buttonLoading=true
        })
        builder.addCase(registerUserThunk.pending,(state)=>{
            state.buttonLoading=false
        })
        builder.addCase(registerUserThunk.rejected,(state)=>{
            state.buttonLoading=false
        })

        //! logout user

         builder.addCase(logoutUserThunk.fulfilled,(state)=>{
            state.userProfile=null;
            state.isAuthenticated=false;
            state.buttonLoading=false;
            state.otherUser=null;
            state.selectedUser=null
            localStorage.clear()

        })
        builder.addCase(logoutUserThunk.pending,(state)=>{
            state.buttonLoading=false
        })
        builder.addCase(logoutUserThunk.rejected,(state)=>{
            state.buttonLoading=false
        })
        //! get User Profile 

         builder.addCase(getUserProfileThunk.fulfilled,(state,action)=>{
            state.screenLoading=false;
            state.isAuthenticated=true;
            state.userProfile=action?.payload?.message
         
          
        })
        builder.addCase(getUserProfileThunk.pending,()=>{
            
        })
        builder.addCase(getUserProfileThunk.rejected,(state)=>{
            state.screenLoading=false
        })

        //! Other User
         builder.addCase(getOtherUserProfileThunk.fulfilled,(state,action)=>{
            state.screenLoading=false;
          
            state.otherUser=action.payload?.message
          
        })
        builder.addCase(getOtherUserProfileThunk.pending,(state)=>{
            state.screenLoading=true
        })
        builder.addCase(getOtherUserProfileThunk.rejected,(state)=>{
            state.screenLoading=false
        })
    }
})

export const {  setSelectedUser} = userSlice.actions;
export default userSlice.reducer;