"use client";
import { CommentsReducer } from "@/app/lib/PostSlice";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import nookies from "nookies";

// @ts-ignore
export default function Comments({ params }: { params: { id: any } }) {
  const dispatch = useDispatch<dispatch>();
  useEffect(() => {
    if (params?.id) {
      dispatch(CommentsReducer(params.id));
      getUserData();
    }
  }, [dispatch, params]);
  const { comments } = useSelector((state: stateStore) => state.post);
  const { loading } = useSelector((state: stateStore) => state.comment);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [editComment, seteditComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [addComment, setAddComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [showComment, setShowComment] = useState("");
  const { mode } = useColorScheme();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditComment = (content: string, id: string) => {
    seteditComment(content);
    setCommentId(id);
  };
  function callComment() {
    setShowComment(editComment);
    setIsEdit(true);
  }

  function handleProfile(id: string) {
    router.push(`/Profile/${id}`);
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  async function CreateComment(content: string) {
    const values = {
      content: content,
      post: params.id,
    };
    await dispatch(CreateCommentReducer(values));
    dispatch(CommentsReducer(params.id));
    setAddComment("");
  }
  async function updateComment(commentId: string, content: string) {
    const values = {
      content: content,
    };
    await dispatch(UpdateCommentReducer({ commentId, values }));
    dispatch(CommentsReducer(params.id));
    setShowComment("");
  }
  async function DeleteComment(commentId: string) {
    await dispatch(DeleteCommentReducer(commentId));
    dispatch(CommentsReducer(params.id));
  }

  const [img, setImg] = useState("");
  function getUserData() {
    axios
      .get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
        setImg(res.data.user.photo);
      })
      .catch(() => {
        return <h1>Errrror in server</h1>;
      });
  }

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          paddingTop: "80px",
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
                width: {
                  xs: "100%",
                  md: "70%",
                },
                mx: "auto",
              }}
              avatar={
                <Avatar
                  onClick={() =>
                    handleProfile(commentOfPost.commentCreator._id)
                  }
                  sx={{
                    cursor: "pointer",
                  }}
                  aria-label="recipe"
                >
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
                      handleClick(event);
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
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        callComment();
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
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
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: {
            xs: "100%",
            md: "70%",
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
          label={isEdit && showComment !== "" ? "Edit Comment" : "Add Comment"}
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
                  <CircularProgress sx={{ width: "15%", height: "20px" }} />
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
  );
}
