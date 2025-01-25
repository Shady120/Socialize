"use client";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postReducer } from "../lib/PostSlice";
import toast from "react-hot-toast";
import { dispatch } from "../lib/store";
import CloseIcon from "@mui/icons-material/Close";
import nookies from "nookies";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreatPost() {
  const dispatch = useDispatch<dispatch>();
  const [imgPost, setImgPost] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  // UploadImg
  function uploadImg(e: any) {
    let src = URL.createObjectURL(e.target.files[0]);
    setImgSrc(src);
    setImgPost(e.target.files[0]);
  }
  
  function createPost() {
    const formData = new FormData();
    if (post) formData.append("body", post);
    if (imgPost) formData.append("image", imgPost);
    setLoading(true);
    if ( post == "" ) {
      toast.error("Please enter a post");
      setLoading(false);
    } else {
      axios
        .post("https://linked-posts.routemisr.com/posts", formData, {
          headers: { token: nookies.get(null, "token").token },
        })
        .then((res) => {
          setLoading(false);
          setPost("");
          setImgPost("");
          setImgSrc("");
          dispatch(postReducer());
          toast.success("Post created successfully!");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error creating post");
        });
    }
  }

  function closeImg(){
    setImgSrc("");
  }

  return (
    <Paper sx={{ marginTop: "100px", width: "100%", marginInline: "auto" }}>
      <Box sx={{ padding: "40px" }}>
        <h2> Create Post </h2>
        <TextField
          sx={{ width: "100%", marginTop: "10px" }}
          id="outlined-multiline-static"
          multiline
          rows={3}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          label="Write Somthing.."
        />

        {imgSrc && (
          <>
            <Box sx={{ position: "relative" }}>
              <img
                src={imgSrc}
                alt="Post Preview"
                style={{ width: "100%", marginTop: "15px" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "30px",
                  right: "10px",
                  cursor: "pointer",
                }}
              >
                <CloseIcon
                  sx={{
                    ":hover": { color: "blue", transition: "0.2s ease all" },
                  }}
                  onClick={closeImg}
                />
              </Box>
            </Box>
          </>
        )}

        <Button
          sx={{ width: "100%", marginBlock: "15px" }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput type="file" onChange={uploadImg} multiple />
        </Button>

        <Button onClick={createPost} variant="outlined" sx={{ width: "100%" }}>
          {loading ? (
            <CircularProgress sx={{ width: "20%", height: "20px" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Paper>
  );
}
