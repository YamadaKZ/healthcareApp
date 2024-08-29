import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Core.module.css";

import {
    selectOpenNewPost,
    resetOpenNewPost,
    fetchPostStart,
    fetchPostEnd,
    fetchAsyncNewPost,
} from "../post/postSlice";

import { Button, TextField, IconButton } from '@mui/material';
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
    content: {
        top: "55%",
        left: "50%",
        width: 280,
        height: 220,
        padding: "50px",
        transform: "translate(-50%, -50%)",
    },
};

const NewPost = () => {
    const dispatch = useDispatch();
    const openNewPost = useSelector(selectOpenNewPost);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");

    const handlerEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    };

    const newPost = async (e) => {
        e.preventDefault();
        const packet = { title: title, img: image };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncNewPost(packet));
        await dispatch(fetchPostEnd());
        setTitle("");
        setImage(null);
        dispatch(resetOpenNewPost());
    };

    return (
        <Modal
            isOpen={openNewPost}
            onRequestClose={() => dispatch(resetOpenNewPost())}
            style={customStyles}
        >
            <form className={styles.core_signUp}>
                <h1 className={styles.core_title}>New Post</h1>

                <br />
                <TextField
                    placeholder="Please enter caption"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="file"
                    id="imageInput"
                    hidden={true}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                <IconButton onClick={handlerEditPicture}>
                    <MdAddAPhoto />
                </IconButton>
                <br />
                <Button
                    disabled={!title || !image}
                    variant="contained"
                    color="primary"
                    onClick={newPost}
                >
                    New post
                </Button>
            </form>
        </Modal>
    );
};

export default NewPost;


// import React, { useState } from "react";
// import Modal from "react-modal";
// import { useSelector, useDispatch } from "react-redux";

// import styles from "./Core.module.css";

// import {
//     selectOpenNewPost,
//     resetOpenNewPost,
//     fetchPostStart,
//     fetchPostEnd,
//     fetchAsyncNewPost,
//     } from "../post/postSlice";

//     import { Button, TextField, IconButton } from '@mui/material';
//     import { MdAddAPhoto } from "react-icons/md";

//     const customStyles = {
//     content: {
//         top: "55%",
//         left: "50%",

//         width: 280,
//         height: 220,
//         padding: "50px",

//         transform: "translate(-50%, -50%)",
//     },
//     };

//     const NewPost = () => {
//     const dispatch = useDispatch();
//     const openNewPost = useSelector(selectOpenNewPost);

//     const [image, setImage] = useState(null);
//     const [title, setTitle] = useState("");

//     const handlerEditPicture = () => {
//         const fileInput = document.getElementById("imageInput");
//         fileInput?.click();
//     };



//     const newPost = async (e) => {
//         e.preventDefault();
//         const packet = { title: title, img: image };
//         await dispatch(fetchPostStart());
//         await dispatch(fetchAsyncNewPost(packet));
//         await dispatch(fetchPostEnd());
//         setTitle("");
//         setImage(null);
//         dispatch(resetOpenNewPost());
//     };

//     return (
//         <>
//         <Modal
//             isOpen={openNewPost}
//             onRequestClose={async () => {
//             await dispatch(resetOpenNewPost());
//             }}
//             style={customStyles}
//         >
//             <form className={styles.core_signUp}>
//             <h1 className={styles.core_title}>SNS clone</h1>

//             <br />
//             <TextField
//                 placeholder="Please enter caption"
//                 type="text"
//                 onChange={(e) => setTitle(e.target.value)}
//             />

//             <input
//                 type="file"
//                 id="imageInput"
//                 hidden={true}
//                 onChange={(e) => setImage(e.target.files[0])}
//             />
//             <br />
//             <IconButton onClick={handlerEditPicture}>
//                 <MdAddAPhoto />
//             </IconButton>
//             <br />
//             <Button
//                 disabled={!title || !image}
//                 variant="contained"
//                 color="primary"
//                 onClick={newPost}
//             >
//                 New post
//             </Button>
//             </form>
//         </Modal>
//         </>
//     );
// };

// export default NewPost;




    // const newPost = async (e) => {
    //     e.preventDefault();
    
    //     const formData = new FormData();
    //     formData.append("title", title);
    //     if (image) {
    //         formData.append("img", image);
    //     }
    
    //     await dispatch(fetchPostStart());
    //     await dispatch(fetchAsyncNewPost(formData));  // 修正: packet ではなく FormData を渡す
    //     await dispatch(fetchPostEnd());
        
    //     setTitle("");
    //     setImage(null);
    //     dispatch(resetOpenNewPost());
    // };
    