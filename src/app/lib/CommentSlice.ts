import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import nookies from "nookies";

export let CreateCommentReducer = createAsyncThunk('comment/createPost',async function (values:any) {
       await    axios.post(`https://linked-posts.routemisr.com/comments`, values, {
        headers: { token:nookies.get(null,"token").token },
      }).then((res)=>{
        toast.success("Create Comment Done")
        return res
    }).catch((error)=>{
             toast.error(`${error.response.data.error}`)       
        })
    }
)
export let UpdateCommentReducer = createAsyncThunk('comment/updatePost',async function (data:{values:any,commentId:any}) {
       await    axios.put(`https://linked-posts.routemisr.com/comments/${data.commentId}`, data.values, {
        headers: { token: nookies.get(null,"token").token },
      }).then((res)=>{
        toast.success("Update done")
        return res
    }).catch((error)=>{
            toast.error(`${error.response.data.error}`)       
        })
    }
)
export let DeleteCommentReducer = createAsyncThunk('comment/deletePost',async function (commentId:any) {
       await  axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: { token: nookies.get(null,"token").token },
      }).then((res)=>{
        toast.success("Done")
        return res
    }).catch((error)=>{
            toast.error("error")
        })
    }
)

let initialState:{loading:boolean}={loading:false}
let CommentSlice = createSlice({
    name: 'comment',
    initialState,
        reducers: {
        },
        extraReducers:function(builder){
             builder.addCase(CreateCommentReducer.pending,(state,action)=>{state.loading = true;})
             builder.addCase(CreateCommentReducer.fulfilled,(state,action)=>{
                state.loading = false;
                
            })
             builder.addCase(CreateCommentReducer.rejected,(state,action)=>{state.loading = false})
             builder.addCase(UpdateCommentReducer.pending,(state,action)=>{state.loading = true;})
             builder.addCase(UpdateCommentReducer.fulfilled,(state,action)=>{
                state.loading = false;
                
            })
             builder.addCase(UpdateCommentReducer.rejected,(state,action)=>{state.loading = false})
            
        }
})

export default CommentSlice.reducer