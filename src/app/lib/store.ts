import { configureStore } from '@reduxjs/toolkit'
import authSlice from "@/app/lib/Slice"
import postSlice from '@/app/lib/PostSlice'
import CommentSlice from '@/app/lib/CommentSlice'
export const store =configureStore({
    reducer:{
       auth: authSlice, 
       post : postSlice,
       comment : CommentSlice,
    }
    
})

export type stateStore = ReturnType<typeof store.getState> 

export type dispatch = typeof store.dispatch
