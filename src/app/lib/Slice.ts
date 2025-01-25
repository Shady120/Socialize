import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import nookies from "nookies";


export const handleLogin = createAsyncThunk("auth/user",async function(formData:{email:string,password:string},{rejectWithValue}){
   return await axios
      .post("https://linked-posts.routemisr.com/users/signin", formData)
      .then((res)=>{ 
        toast.success("Welcome back Dear")
        return res.data
      }).catch((error:any)=>{
        toast.error(`invalid Password or Email`)
        return rejectWithValue(error.response)
      })   
})

let initialState:{token:{}|null,isLoading:boolean,error:string|null} = {error:null ,token: nookies.get(null, "token"),isLoading:false}

let authSlice = createSlice({
  name: 'auth',
  initialState,
  
  reducers: {
    clearData(state) {
      state.error = null;
      state.token = null;
      nookies.destroy(null,"token")
    },
    
  },
  extraReducers: function (builder) {
    builder
      .addCase(handleLogin.fulfilled, function (state, action) {
          state.isLoading = false;
          state.token = action?.payload?.token;
          nookies.set(null,"token",action?.payload?.token,{
            path: "/",
          })
      })
      builder.addCase(handleLogin.rejected, function (state, action) {
          state.isLoading = false;
          state.error= "errrorrrr"
           ;        
      })
      builder.addCase(handleLogin.pending, function (state, action) {
        state.isLoading = true;
      });
  },
});


export const {clearData} = authSlice.actions

export default authSlice.reducer