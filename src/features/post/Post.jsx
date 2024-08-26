import React, { useState } from "react";
import styles from "./Post.module.css";

import { styled } from "@mui/system";
import { Avatar, Divider, Checkbox, AvatarGroup } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
//import { AppDispatch } from "../../store";

import { selectProfiles } from "../auth/authSlice";

import {
    selectComments,
    fetchPostStart,
    fetchPostEnd,
    fetchAsyncPostComment,
    fetchAsyncPatchLiked,
    } from "./postSlice";

    // スタイルを styled API に移行
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
    }));

    const Post = ({ postId, loginId, userPost, title, imageUrl, liked }) => {
    const dispatch = useDispatch();
    const profiles = useSelector(selectProfiles);
    const comments = useSelector(selectComments);
    const [text, setText] = useState("");

    const commentsOnPost = comments.filter((com) => com.post === postId);
    const prof = profiles.filter((prof) => prof.userProfile === userPost);

    const postComment = async (e) => {
        e.preventDefault();
        const packet = { text: text, post: postId };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncPostComment(packet));
        await dispatch(fetchPostEnd());
        setText("");
    };

    const handlerLiked = async () => {
        const packet = {
        id: postId,
        title: title,
        current: liked,
        new: loginId,
        };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncPatchLiked(packet));
        await dispatch(fetchPostEnd());
    };

    if (title) {
        return (
        <div className={styles.post}>
            <div className={styles.post_header}>
            <Avatar className={styles.post_avatar} src={prof[0]?.img} />
            <h3>{prof[0]?.nickName}</h3>
            </div>
            <img className={styles.post_image} src={imageUrl} alt="" />

            <h4 className={styles.post_text}>
            <Checkbox
                className={styles.post_checkBox}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                // checked={liked.some((like) => like === loginId)}
                checked={Array.isArray(liked) && liked.some((like) => like === loginId)}
                onChange={handlerLiked}
            />
            <strong> {prof[0]?.nickName}</strong> {title}
            {/* <AvatarGroup max={7}>
                {liked.map((like) => (
                <Avatar
                    className={styles.post_avatarGroup}
                    key={like}
                    src={profiles.find((prof) => prof.userProfile === like)?.img}
                />
                ))}
            </AvatarGroup> */}


            <AvatarGroup max={7}>
            {Array.isArray(liked) &&
                liked.map((like) => (
                <Avatar
                    className={styles.post_avatarGroup}
                    key={like}
                    src={profiles.find((prof) => prof.userProfile === like)?.img}
                />
                ))}
            </AvatarGroup>


            </h4>

            <Divider />
            <div className={styles.post_comments}>
            {commentsOnPost.map((comment) => (
                <div key={comment.id} className={styles.post_comment}>
                <SmallAvatar
                    src={
                    profiles.find(
                        (prof) => prof.userProfile === comment.userComment
                    )?.img
                    }
                />
                <p>
                    <strong className={styles.post_strong}>
                    {
                        profiles.find(
                        (prof) => prof.userProfile === comment.userComment
                        )?.nickName
                    }
                    </strong>
                    {comment.text}
                </p>
                </div>
            ))}
            </div>

            <form className={styles.post_commentBox}>
            <input
                className={styles.post_input}
                type="text"
                placeholder="add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                disabled={!text.length}
                className={styles.post_button}
                type="submit"
                onClick={postComment}
            >
                Post
            </button>
            </form>
        </div>
        );
    }
    return null;
};

export default Post;


// import React, { useState } from "react";
// import styles from "./Post.module.css";

// import { makeStyles } from '@mui/styles';
// import { Avatar, Divider, Checkbox } from '@mui/material';
// import { Favorite, FavoriteBorder } from '@mui/icons-material';

// import AvatarGroup from "@material-ui/lab/AvatarGroup";

// import { useSelector, useDispatch } from "react-redux";
// import AppDispatch from "../../store"

// import { selectProfiles } from "../auth/authSlice";

// import {
//     selectComments,
//     fetchPostStart,
//     fetchPostEnd,
//     fetchAsyncPostComment,
//     fetchAsyncPatchLiked,
//     } from "./postSlice";

//     const useStyles = makeStyles((theme) => ({
//     small: {
//         width: theme.spacing(3),
//         height: theme.spacing(3),
//         marginRight: theme.spacing(1),
//     },
//     }));

//     const Post = ({ postId, loginId, userPost, title, imageUrl, liked }) => {
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const profiles = useSelector(selectProfiles);
//     const comments = useSelector(selectComments);
//     const [text, setText] = useState("");

//     const commentsOnPost = comments.filter((com) => {
//         return com.post === postId;
//     });

//     const prof = profiles.filter((prof) => {
//         return prof.userProfile === userPost;
//     });

//     const postComment = async (e) => {
//         e.preventDefault();
//         const packet = { text: text, post: postId };
//         await dispatch(fetchPostStart());
//         await dispatch(fetchAsyncPostComment(packet));
//         await dispatch(fetchPostEnd());
//         setText("");
//     };

//     const handlerLiked = async () => {
//         const packet = {
//         id: postId,
//         title: title,
//         current: liked,
//         new: loginId,
//         };
//         await dispatch(fetchPostStart());
//         await dispatch(fetchAsyncPatchLiked(packet));
//         await dispatch(fetchPostEnd());
//     };

//     if (title) {
//         return (
//         <div className={styles.post}>
//             <div className={styles.post_header}>
//             <Avatar className={styles.post_avatar} src={prof[0]?.img} />
//             <h3>{prof[0]?.nickName}</h3>
//             </div>
//             <img className={styles.post_image} src={imageUrl} alt="" />

//             <h4 className={styles.post_text}>
//             <Checkbox
//                 className={styles.post_checkBox}
//                 icon={<FavoriteBorder />}
//                 checkedIcon={<Favorite />}
//                 checked={liked.some((like) => like === loginId)}
//                 onChange={handlerLiked}
//             />
//             <strong> {prof[0]?.nickName}</strong> {title}
//             <AvatarGroup max={7}>
//                 {liked.map((like) => (
//                 <Avatar
//                     className={styles.post_avatarGroup}
//                     key={like}
//                     src={profiles.find((prof) => prof.userProfile === like)?.img}
//                 />
//                 ))}
//             </AvatarGroup>
//             </h4>

//             <Divider />
//             <div className={styles.post_comments}>
//             {commentsOnPost.map((comment) => (
//                 <div key={comment.id} className={styles.post_comment}>
//                 <Avatar
//                     src={
//                     profiles.find(
//                         (prof) => prof.userProfile === comment.userComment
//                     )?.img
//                     }
//                     className={classes.small}
//                 />
//                 <p>
//                     <strong className={styles.post_strong}>
//                     {
//                         profiles.find(
//                         (prof) => prof.userProfile === comment.userComment
//                         )?.nickName
//                     }
//                     </strong>
//                     {comment.text}
//                 </p>
//                 </div>
//             ))}
//             </div>

//             <form className={styles.post_commentBox}>
//             <input
//                 className={styles.post_input}
//                 type="text"
//                 placeholder="add a comment"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//             />
//             <button
//                 disabled={!text.length}
//                 className={styles.post_button}
//                 type="submit"
//                 onClick={postComment}
//             >
//                 Post
//             </button>
//             </form>
//         </div>
//         );
//     }
//     return null;
// };

// export default Post;