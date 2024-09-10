import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CircularProgress, Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { selectPosts, selectIsLoadingPost, setOpenNewPost } from "../../features/post/postSlice";
import Post from "../../features/post/Post";
import { useInitialFetch } from "../../hooks/useInitialFetch";

import NewPost from "../../features/core/NewPost";
import "./BlogPage.scss";

const BlogPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const isLoadingPost = useSelector(selectIsLoadingPost);
    useInitialFetch();

    const handleOpenNewPost = () => {
        dispatch(setOpenNewPost());
    };

    if (isLoadingPost) {
        return <CircularProgress />;
    }

    return (
        <div className="blog-page">
            <Grid container spacing={4}>
                {posts
                    .slice(0)
                    .reverse()
                    .map((post) => (
                        <Grid key={post.id} item xs={12} md={4} className="post-container">
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

            <Box className="footer">
                <Fab
                    sx={{
                        backgroundColor: "#34675c",
                        color: "white",
                        border: "2px solid #324851",
                        "&:hover": {
                            backgroundColor: "#86ac41",
                        },
                        borderRadius: "8px",
                        padding: "10px 20px",
                    }}
                    aria-label="add"
                    onClick={handleOpenNewPost}
                >
                    <AddIcon />
                </Fab>
            </Box>

            <NewPost />
        </div>
    );
};

export default BlogPage;



// import React from "react";
// import { useSelector } from "react-redux";
// import { Grid, CircularProgress, Fab, Box } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { selectPosts, selectIsLoadingPost } from "../../features/post/postSlice";
// import Post from "../../features/post/Post";
// import { useInitialFetch } from "../../hooks/useInitialFetch";
// import "./BlogPage.scss"; // SCSSファイルをインポート

// const BlogPage = () => {
//     const posts = useSelector(selectPosts);
//     const isLoadingPost = useSelector(selectIsLoadingPost);
//     useInitialFetch();

//     if (isLoadingPost) {
//         return <CircularProgress />;
//     }

//     return (
//         <div className="blog-page">
//             <Grid container spacing={4}>
//                 {posts
//                     .slice(0)
//                     .reverse()
//                     .map((post) => (
//                         <Grid key={post.id} item xs={12} md={4} className="post-container">
//                             <Post
//                                 postId={post.id}
//                                 title={post.title}
//                                 loginId={post.userProfile}
//                                 userPost={post.userPost}
//                                 imageUrl={post.img}
//                                 liked={post.liked}
//                             />
//                         </Grid>
//                     ))}
//             </Grid>

//             {/* フッターに透明な背景を設定し、ボタンを中央に配置 */}
//             <Box className="footer">
//                 {/* <Fab
//                     sx={{
//                         //backgroundColor: "#324851",
//                         backgroundColor: "#34675c",
//                         color: "white",
//                         "&:hover": {
//                             //backgroundColor: "#34675c",
//                             backgroundColor: "#324851",
//                         },
//                         borderRadius: "8px", // モダンな長方形ボタン
//                         padding: "10px 30px", // ボタンサイズ
//                     }}
//                     aria-label="add"
//                 >
//                     <AddIcon />
//                 </Fab> */}
//                 <Fab
//                     sx={{
//                         backgroundColor: "#34675c",
//                         color: "white",
//                         border: "2px solid #324851", // 外枠を#324851に設定
//                         "&:hover": {
//                             backgroundColor: "#86ac41", // ホバー時の色を#86ac41に変更
//                         },
//                         borderRadius: "8px", // モダンな長方形ボタン
//                         padding: "10px 20px", // ボタンサイズ
//                     }}
//                     aria-label="add"
//                 >
//                     <AddIcon />
//                 </Fab>

//             </Box>
//         </div>
//     );
// };

// export default BlogPage;




// // src/pages/BlogPage.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { Grid, CircularProgress } from "@mui/material";
// import { selectPosts, selectIsLoadingPost } from "../../features/post/postSlice";
// import Post from "../../features/post/Post";
// import { useInitialFetch } from "../../hooks/useInitialFetch";

// const BlogPage = () => {
//     const posts = useSelector(selectPosts);
//     const isLoadingPost = useSelector(selectIsLoadingPost);
//     useInitialFetch();  

//     if (isLoadingPost) {
//         return <CircularProgress />;
//     }

//     return (
//         <div>
//         <Grid container spacing={4}>
//             {posts
//             .slice(0)
//             .reverse()
//             .map((post) => (
//                 <Grid key={post.id} item xs={12} md={4}>
//                 <Post
//                     postId={post.id}
//                     title={post.title}
//                     loginId={post.userProfile}
//                     userPost={post.userPost}
//                     imageUrl={post.img}
//                     liked={post.liked}
//                 />
//                 </Grid>
//             ))}
//         </Grid>
//         </div>
//     );
// };

// export default BlogPage;