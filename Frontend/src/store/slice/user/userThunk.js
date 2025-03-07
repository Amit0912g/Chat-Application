import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'
import { axiosInstance } from "../../../utilities/axiosInstance.js";

export const loginUserThunk= createAsyncThunk(
    "user/login",
    async ({username,password},rejectWithValue) => {
      try {
        const response= await axiosInstance.post("/user/login",{
          username,password
        })
        toast.success("Login successfully")
      
        return response.data
      } catch (error) {
      
        const errorMesssage=error?.response?.data?.message;
        toast.error(errorMesssage)
        return rejectWithValue(errorMesssage)
      }
    }
)

export const registerUserThunk= createAsyncThunk(
  "user/register",
  async ({username,password,fullName,gender},rejectWithValue) => {
    try {
      const response= await axiosInstance.post("/user/register",{
        username,password,fullName,gender
      })
      toast.success("Register successfully")
      return response.data
    } catch (error) {
    
      const errorMesssage=error?.response?.data?.message;
      toast.error(errorMesssage)
      return rejectWithValue(errorMesssage)
    }
  }
)

export const logoutUserThunk= createAsyncThunk(
  "user/logout",
  async (_,rejectWithValue) => {
    try {
      const response= await axiosInstance.post("/user/logout")
      toast.success("Logout successfull!!!")
     
      return response.data
    } catch (error) {
    
      const errorMesssage=error?.response?.data?.message;
      toast.error(errorMesssage)
      return rejectWithValue(errorMesssage)
    }
  }
)
export const getUserProfileThunk= createAsyncThunk(
  "user/getUserProfile",
  async (_,rejectWithValue) => {
    try {
      const response= await axiosInstance.get("/user/get-profile")
   
      return response.data
    } catch (error) {
     
      const errorMesssage=error?.response?.data?.message;
      return rejectWithValue(errorMesssage)
    }
  }
)

export const getOtherUserProfileThunk= createAsyncThunk(
  "user/getOtherUserProfile",
  async (_,rejectWithValue) => {
    try {
      const response= await axiosInstance.get("/user/get-otherProfile")
     
      return response.data
    } catch (error) {
     
      const errorMesssage=error?.response?.data?.message;
      return rejectWithValue(errorMesssage)
    }
  }
)

