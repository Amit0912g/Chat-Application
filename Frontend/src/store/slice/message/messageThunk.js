import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance.js";

export const sendMessageThunk= createAsyncThunk(
    "message/send",
    async ({receiverId,message},rejectWithValue) => {
      try {
        const response= await axiosInstance.post(`/message/sendMessage/${receiverId}`,{
          message
        })
      
        return response.data
      } catch (error) {
      
        const errorMesssage=error?.response?.data?.message;
        return rejectWithValue(errorMesssage)
      }
    }
)
export const getMessageThunk= createAsyncThunk(
    "message/get",
    async ({receiverId},rejectWithValue) => {
      try {
        const response= await axiosInstance.get(`/message/getMessage/${receiverId}`)

        return response.data
      } catch (error) {
      
        const errorMesssage=error?.response?.data?.message;
        return rejectWithValue(errorMesssage)
      }
    }
)
