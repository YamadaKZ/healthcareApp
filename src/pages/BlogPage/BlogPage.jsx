// src/pages/BlogPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { selectPosts, selectIsLoadingPost } from "../../features/post/postSlice";
import Post from "../../features/post/Post";
import { useInitialFetch } from "../../hooks/useInitialFetch";

const BlogPage = () => {
    const posts = useSelector(selectPosts);
    const isLoadingPost = useSelector(selectIsLoadingPost);
    useInitialFetch();  

    if (isLoadingPost) {
        return <CircularProgress />;
    }

    return (
        <div>
        <h1>Blog</h1>
        <Grid container spacing={4}>
            {posts
            .slice(0)
            .reverse()
            .map((post) => (
                <Grid key={post.id} item xs={12} md={4}>
                <Post
                    postId={post.id}
                    title={post.title}
                    loginId={post.userProfile}
                    userPost={post.userPost}
                    imageUrl={post.img}
                    liked={post.liked}
                />
                </Grid>
            ))}
        </Grid>
        </div>
    );
};

export default BlogPage;