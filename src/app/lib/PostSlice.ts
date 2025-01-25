
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comments, Post, PostData} from "../interface/PostData";
import axios from "axios";
import nookies from "nookies";




// Get All Post
export const postReducer = createAsyncThunk("post/allPosts",async function(){
    const token = nookies.get(null,"token").token
    return await axios.get(`https://linked-posts.routemisr.com/posts?page=62`,{headers:{
        token
    }})
    .then((res)=>{
        return res.data
        
    })
})
 
//Get All Comments 
export const CommentsReducer = createAsyncThunk("post/CommentsPosts",async function(id:string){
    const token = nookies.get(null,"token").token
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments`,{headers:{
        token   
    }})
    .then((res)=>{;        
        return res.data

    })
})

//Get SinglePost
export let SinglepostReducer = createAsyncThunk("post/SinglePosts",async function(id:string){
    const token = nookies.get(null,"token").token
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{headers:{
        token   
    }})
    .then((res)=>{;
        return res.data
    })
})


let initialState:{loading:boolean,posts:PostData[]|null,comments:Comments[]|null,singlePost:Post|null}={singlePost:null,comments:null,loading:false,posts:null}
let postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
},
extraReducers:function(builder){
    builder.addCase(postReducer.pending,(state,action)=>{
        state.loading = true;
        })
    builder.addCase(postReducer.fulfilled,(state,action)=>{
        state.loading = false;
        state.posts= action.payload.posts  
})
    builder.addCase(postReducer.rejected,(state,action)=>{
    state.loading = false;
    
    })
    builder.addCase(CommentsReducer.pending,(state,action)=>{
        state.loading = true;
        })
    builder.addCase(CommentsReducer.fulfilled,(state,action)=>{
        state.loading = false;        
        state.comments= action?.payload?.comments
})
    builder.addCase(CommentsReducer.rejected,(state)=>{
    state.loading = false;
    })
    builder.addCase(SinglepostReducer.pending,(state,action)=>{
        state.loading = true;
        })
    builder.addCase(SinglepostReducer.fulfilled,(state,action)=>{
        state.loading = false;        
        state.singlePost = action?.payload?.post
})
    builder.addCase(SinglepostReducer.rejected,(state)=>{
    state.loading = false;
    })
}})

export default postSlice.reducer