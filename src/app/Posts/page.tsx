"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Skeleton, useColorScheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { dispatch, stateStore } from "../lib/store";
import { postReducer } from "../lib/PostSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Posts() {
  const dispatch = useDispatch<dispatch>();
  const router = useRouter();

  const { mode } = useColorScheme();
  const { posts, loading } = useSelector((state: stateStore) => state.post);
  React.useEffect(() => {
    dispatch(postReducer());
  }, [dispatch]);

  const handelComments = (id: string) => {
    router.push(`/Comments/${id}`);
  };

  const handelSinglePost = (id: string) => {
    router.push(`/SinglePost/${id}`);
  };

  return (
    <>
      <Box>
        {loading ? (
          <div>
            {[...Array(2)].map((_, index) => (
              <Card key={index} sx={{ width: "100%", marginBlock: "20px" }}>
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
          <div>
            {posts
              ?.map((post: any) => {
                const formData = new Date(post.createdAt);
                const day = formData.toLocaleDateString("en-us", {
                  weekday: "long",
                });
                const date = `${formData.getFullYear()}-${
                  formData.getUTCMonth() + 1
                }-${formData.getUTCDate()}`;

                return (
                  <Card
                    key={post._id}
                    sx={{ width: "100%", marginBlock: "20px" }}
                  >
                    <CardHeader
                      sx={{
                        background: mode === "dark" ? "#333" : "#eee",
                        cursor: "pointer",
                      }}
                      avatar={
                        <Avatar
                          onClick={() => handelSinglePost(post._id)}
                          sx={{
                            bgcolor: red[500],
                            cursor: "pointer",
                            ":hover": { bgcolor: red[800] },
                          }}
                          aria-label="recipe"
                        >
                          <Image
                            src={post.user.photo}
                            alt={post.user.name}
                            width={50}
                            height={50}
                          />
                        </Avatar>
                      }
                      title={post.user.name}
                      subheader={`${day} ${date}`}
                      titleTypographyProps={{
                        onClick: () => handelSinglePost(post._id),
                      }}
                    />
                    {post.image && (
                      <CardMedia
                        component="img"
                        height="500"
                        width="500"
                        image={post?.image}
                        alt="Post Image"
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
                        <IconButton aria-label="like">
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
                        <IconButton aria-label="comment">
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
                            onClick={() => handelSinglePost(post._id)}
                            sx={{
                              bgcolor: red[500],
                              cursor: "pointer",
                              ":hover": { bgcolor: red[800] },
                            }}
                            aria-label="recipe"
                          >
                            <Image
                              src={post?.user?.photo}
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
                          onClick: () => handelSinglePost(post._id),
                        }}
                      />
                    ) : null}
                  </Card>
                );
              })
              .reverse()}
          </div>
        )}
      </Box>
    </>
  );
}
