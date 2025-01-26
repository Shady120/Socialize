"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  CardHeader,
  useColorScheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  styled,
} from "@mui/material";
import logo from "@/assests/images.png";
import axios from "axios";
import { red } from "@mui/material/colors";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";
import CreatPost from "@/app/_CreatPost/CreatPost";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/navigation";
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

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [userPost, setUserPost] = useState([]);
  const [name, setName] = useState("");
  const [photoProfileSrc, setPhotoProfileSrc] = useState("");
  const { mode } = useColorScheme();
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);


  function getUserData() {
    axios
      .get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
        setName(res.data.user.name);
        getPosts(res.data.user._id);
        setPhotoProfileSrc(res.data.user.photo);
      })
      .catch(() => {
        toast.error("Error in fetching user data");
      });
  }

  async function getPosts(id: string) {
    await axios
      .get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=50`, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
        setUserPost(res.data.posts);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error in fetching posts");
      });
  }

  function updatePhotoProfile(e: any) {
    const formData = new FormData();
    const src = URL.createObjectURL(e.target.files[0]);
    const file = e.target.files[0];
    formData.append("photo", file);
    setPhotoProfileSrc(src);
    axios
      .put("https://linked-posts.routemisr.com/users/upload-photo", formData, {
        headers: { token: nookies.get(null, "token").token },
      })
      .then((res) => {
        toast.success("Profile photo updated successfully");
        getUserData();
      })
      .catch((error) => {
        toast.error(`${error.response.data.error}`);
      });
  }

  const handelComments = (id: string) => {
    router.push(`/Comments/${id}`);
  };

   const handelSinglePost = (id: string) => {
     router.push(`/SinglePost/${id}`);
   };
   const handelChangePass = () => {
     router.push(`/ForgetPass`);
   };

   

   
  return (
    
    <Box sx={{ overflow: "auto", width: "100%", mx: "auto" }}>
      {/* Profile Header */}
      <Box
        sx={{
          width: "70%",
          backgroundImage: `url(${logo.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          paddingTop: "300px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
            src={photoProfileSrc}
            alt="Profile Photo"
          />
          <IconButton
            component="label"
            sx={{
              backgroundColor: mode === "dark" ? "#000" : "#f0f0f0",
              width: 30,
              height: 30,
              position: "absolute",
              left: 90,
              padding: "20px",
              bottom: 10,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#444",
                color: "#fff",
              },
            }}
          >
            <CameraAltIcon />
            <VisuallyHiddenInput
              type="file"
              onChange={updatePhotoProfile}
              accept="image/*"
            />
          </IconButton>
        </Box>
      </Box>

      {/* User Info */}
      <Box sx={{ textAlign: "center", mt: 8 }}>
        {loading ? (
          <Skeleton sx={{ mx: "auto", width: "200px" }} />
        ) : (
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
        )}
        {loading ? (
          <Skeleton sx={{ mx: "auto", width: "100px" }} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            {"Front-end Web Developer"}
          </Typography>
        )}
        <Button onClick={handelChangePass} variant="text">
          Change Password
        </Button>
      </Box>

      {/* Create Post */}
      <Box sx={{ width: {
        xs: "100%",
        md: "75%",
      }, mx: "auto" }}>
        <CreatPost />
      </Box>

      {/* Display User Posts */}

      {loading ? (
        <div>
          {[...Array(2)].map((_, index) => (
            <Card key={index} sx={{ width: {
              xs: "100%",
              md: "70%",
            }, mx: "auto", my: "20px" }}>
              <CardHeader
                avatar={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                }
                action={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={30}
                    height={30}
                  />
                }
                title={<Skeleton animation="wave" height={10} width="80%" />}
                subheader={
                  <Skeleton animation="wave" height={10} width="40%" />
                }
              />
              <Skeleton
                sx={{ height: 190 }}
                animation="wave"
                variant="rectangular"
              />
              <CardContent>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        userPost
          .map((post: any) => {
            const formData = new Date(post.createdAt);
            const day = formData.toLocaleDateString("en-us", {
              weekday: "long",
            });
            const date = `${formData.getFullYear()}-${
              formData.getUTCMonth() + 1
            }-${formData.getUTCDate()}`;
            return (
              <Box
                key={post._id}
                sx={{ marginBottom: 2, width: {
                  xs: "100%",
                  md: "75%",
                }, mx: "auto" }}
              >
                <Card sx={{ Width: "100%", marginBlock: "20px" }}>
                  <CardHeader
                    sx={{
                      background: mode === "dark" ? "#444" : "#eee",
                      cursor: "pointer",
                    }}
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: red[500],
                          cursor: "pointer",
                          ":hover": { bgcolor: red[800] },
                        }}
                      >
                        <Image
                          src={post.user.photo}
                          alt={post.user.name}
                          width={50}
                          height={50}
                        />
                      </Avatar>
                    }
                    onClick={() => {
                      handelSinglePost(post._id);
                    }}
                    title={post.user.name}
                    subheader={`${day} ${date}`}
                  />
                  {post.image && (
                    <CardMedia
                      component="img"
                      height="500"
                      image={post?.image}
                      alt=""
                    />
                  )}
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {post?.body}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textAlign: "right",
                        marginTop: "10px",
                      }}
                    >
                      {post.comments.length} Comments
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      background: mode === "dark" ? "#433" : "#eee",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton aria-label="add to favorites">
                        <ThumbUpIcon />
                      </IconButton>
                      <p>Like</p>
                    </Box>
                    <Box
                      onClick={() => handelComments(post._id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <IconButton aria-label="add to favorites">
                        <CommentIcon />
                      </IconButton>
                      <p>Comment</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <p>Share</p>
                    </Box>
                  </CardActions>

                  {/* First Comment */}
                  {post.comments.length !== 0 ? (
                    <CardHeader
                      sx={{ background: mode === "dark" ? "#455" : "#eee" }}
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: red[500],
                            cursor: "pointer",
                            ":hover": { bgcolor: red[800] },
                          }}
                        >
                          <Image
                            src={logo}
                            alt={post?.user?.name}
                            width={50}
                            height={50}
                          />
                        </Avatar>
                      }
                      title={post?.comments[0]?.commentCreator?.name}
                      subheader={post?.comments[0]?.content}
                      titleTypographyProps={{
                        style: { cursor: "pointer" },
                      }}
                    />
                  ) : null}
                </Card>
              </Box>
            );
          })
          .reverse()
      )}
    </Box>
  );
}
