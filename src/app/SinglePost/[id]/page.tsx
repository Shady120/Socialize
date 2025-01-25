"use client";
import { CommentsReducer, SinglepostReducer } from "@/app/lib/PostSlice";
import {
  CreateCommentReducer,
  DeleteCommentReducer,
  UpdateCommentReducer,
} from "@/app/lib/CommentSlice";
import { dispatch, stateStore } from "@/app/lib/store";
import {
  Box,
  useColorScheme,
  Avatar,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Modal,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import logo from "@/assests/testimonial-4.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
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
export default function Comments({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<dispatch>();
  const router = useRouter();

  const { comments, singlePost } = useSelector(
    (state: stateStore) => state.post
  );
   const formData = new Date(singlePost?.createdAt||'');
   const day = formData.toLocaleDateString("en-us", {
     weekday: "long",
   });
   const date = `${formData.getFullYear()}-${
     formData.getUTCMonth() + 1
   }-${formData.getUTCDate()}`;
  const { loading } = useSelector((state: stateStore) => state.comment);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElOfPost, setAnchorElOfPost] = useState<null | HTMLElement>(
    null
  );
  const [editComment, setEditComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [addComment, setAddComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [showComment, setShowComment] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mode } = useColorScheme();
  const [imgPost, setImgPost] = useState("");
  const [post, setPost] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  
  // Handle open/close for post edit modal
  const handleOpenEditPost = () => setOpenEditModal(true);
  const handleCloseEditPost = () => setOpenEditModal(false);
  const open = Boolean(anchorEl);
  const openOfPost = Boolean(anchorElOfPost);

  useEffect(() => {
    // setLoadingPost(true)
    if (params?.id) {
      dispatch(SinglepostReducer(params?.id));
      dispatch(CommentsReducer(params?.id));
          getUserData();

    }
  }, [dispatch, params]);

  const handleMenuClickOfPost = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOfPost(event.currentTarget);
  };

  const handleCloseMenuOfPost = () => {
    setAnchorElOfPost(null);
  };



  // UploadImg
  function uploadImg(e: any) {
    let src = URL.createObjectURL(e.target.files[0]);
    setImgSrc(src);
    setImgPost(e.target.files[0]);
  }

  function updatePost(id:any) {
    const formData = new FormData();
    if (post) formData.append("body", post);
    if (imgPost) formData.append("image", imgPost);

    axios
      .put(`https://linked-posts.routemisr.com/posts/${id}`, formData, {
        headers: { token: nookies.get(null,"token").token },
      })
      .then((res) => {
        // setLoadingPost(false);
        if (post == "") {
          toast.error("Please enter a post");
        } else {
          setPost("");
          setImgPost("");
          setImgSrc("");
          dispatch(SinglepostReducer(params?.id));
          setOpenEditModal(false);
          toast.success("Post created successfully!");
        }
      })
      .catch((error) => {
        toast.error("Error creating post");
      });
  }

  function deletePost(id:any){
    axios
      .delete(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
        toast.success("Post deleted successfully");
        router.push("/");
      })
      .catch((error) => {
        toast.error(`${error.response.data.error}`);
      });
  }
  function closeImg() {
    setImgSrc("");
  }
  // Proprites of Comments
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditComment = (content: string, id: string) => {
    setEditComment(content);
    setCommentId(id);
    setIsEdit(true);
  };

  function callComment() {
    setShowComment(editComment);
    setIsEdit(true);
  }

  async function CreateComment(content: string) {
    const values = { content, post: params?.id };
    await dispatch(CreateCommentReducer(values));
    dispatch(CommentsReducer(params?.id));

    setAddComment("");
  }

  async function updateComment(commentId: string, content: string) {
    const values = { content };
    await dispatch(UpdateCommentReducer({ commentId, values }));
    dispatch(CommentsReducer(params?.id));
    setShowComment("");
    setIsEdit(false);
  }

  async function DeleteComment(commentId: string) {
    await dispatch(DeleteCommentReducer(commentId));
    dispatch(CommentsReducer(params?.id));
  }

  const [img , setImg] = useState("")
  function getUserData() {
    axios
      .get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
          setImg(res.data.user.photo);
      })
      .catch((errror) => {
        return <h1>Errrror in server</h1>;
      });
  }
   
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box sx={{ width: "100%", paddingTop: "10px" }}>
        <Paper
          elevation={10}
          sx={{
            width: {
              xs: "100%",
              md: "80%",
            },
            marginInline: "auto",
            marginBlock: 10,
          }}
        >
          <Card sx={{ width: "100%" }}>
            {/* Post Section */}
            <CardHeader
              sx={{ background: mode === "dark" ? "#455" : "#eee" }}
              avatar={
                <Avatar
                  alt={singlePost?.user.name}
                  src={singlePost?.user.photo}
                />
              }
              action={
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    aria-controls={openOfPost ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openOfPost ? "true" : undefined}
                    onClick={handleMenuClickOfPost}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    sx={{ position: "absolute", zIndex: "1" }}
                    id="basic-menu"
                    anchorEl={anchorElOfPost}
                    open={openOfPost}
                    onClose={handleCloseMenuOfPost}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleOpenEditPost(),
                          handleCloseMenuOfPost(),
                          setPost(singlePost?.body || ""),
                          setImgSrc(singlePost?.image || "");
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => deletePost(singlePost?._id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
              }
              title={singlePost?.user.name}
              subheader={`${day} , ${date}`}
            />
            {singlePost?.image && (
              <CardMedia
                component="img"
                height="500"
                image={singlePost.image}
                alt="Post Image"
              />
            )}
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {singlePost?.body}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  textAlign: "right",
                  marginTop: "10px",
                }}
              >
                {singlePost?.comments.length} Comments
              </Typography>
            </CardContent>

            {/* Post Actions */}
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                background: mode === "dark" ? "#433" : "#eee",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton aria-label="like">
                  <ThumbUpIcon />
                </IconButton>
                <Typography>Like</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
                <Typography>Comment</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Typography>Share</Typography>
              </Box>
            </CardActions>

            {/* Edit Post Modal */}
            <Modal
              open={openEditModal}
              onClose={handleCloseEditPost}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                width: {
                  xs: "100%",
                  md: "80%",
                },
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  padding: "50px",
                  bgcolor: "black",
                  marginTop: "10px",
                  overflowY: "auto",
                  height: "100vh",
                }}
              >
                <h2> Edit Post </h2>
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
                            ":hover": {
                              color: "blue",
                              transition: "0.2s ease all",
                            },
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
                  <VisuallyHiddenInput
                    type="file"
                    onChange={uploadImg}
                    multiple
                  />
                </Button>

                <Button
                  onClick={() => {
                    updatePost(singlePost?._id);
                  }}
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  {loading ? (
                    <CircularProgress sx={{ width: "20%", height: "20px" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </Modal>
          </Card>

          {/* Comment Section */}
          <Box sx={{ overflowX: "hidden" }}>
            <Box
              sx={{
                width: "100%",
                marginBottom: "50px",
              }}
            >
              {comments?.map((commentOfPost) => {
                return (
                  <CardHeader
                    key={commentOfPost._id}
                    sx={{
                      cursor: "pointer",
                      background: mode === "dark" ? "#444" : "#eee",
                    }}
                    avatar={
                      <Avatar>
                        <Image
                          src={img}
                          alt={commentOfPost?.commentCreator?.name}
                          width={50}
                          height={50}
                        />
                      </Avatar>
                    }
                    action={
                      <div>
                        <IconButton
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(event) => {
                            handleMenuClick(event);
                            handleEditComment(
                              commentOfPost.content,
                              commentOfPost._id
                            );
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleCloseMenu}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          sx={{
                            width: "100%",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleCloseMenu();
                              callComment();
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleCloseMenu();
                              DeleteComment(commentId);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </div>
                    }
                    subheader={commentOfPost?.content}
                    title={commentOfPost?.commentCreator?.name}
                  />
                );
              })}
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: {
                    xs: "100%",
                    md: "80%",
                  },
                  maxWidth: "100%",
                  background: mode === "dark" ? "#444" : "#ddd",
                  padding: "12px",
                }}
              >
                <TextField
                  onChange={(e) => {
                    isEdit
                      ? setShowComment(e.target.value)
                      : setAddComment(e.target.value);
                  }}
                  fullWidth
                  value={isEdit ? showComment : addComment}
                  label={
                    isEdit && showComment !== ""
                      ? "Edit Comment"
                      : "Add Comment"
                  }
                  id="fullWidth"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => {
                          isEdit
                            ? updateComment(commentId, showComment)
                            : CreateComment(addComment);
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            sx={{ width: "15%", height: "20px" }}
                          />
                        ) : !isEdit || showComment === "" ? (
                          <SendIcon sx={{ cursor: "pointer" }} />
                        ) : (
                          <Button>
                            <EditIcon sx={{ cursor: "pointer" }} />
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
