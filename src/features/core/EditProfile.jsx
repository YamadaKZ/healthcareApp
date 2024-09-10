import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./Core.module.css";

import { useSelector, useDispatch } from "react-redux";
import {
    //editNickname,
    selectProfile,
    selectOpenProfile,
    resetOpenProfile,
    fetchCredStart,
    fetchCredEnd,
    fetchAsyncUpdateProf,
    } from "../auth/authSlice";

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

    const EditProfile = () => {
    const dispatch = useDispatch();
    const openProfile = useSelector(selectOpenProfile);
    const profile = useSelector(selectProfile);
    const [image, setImage] = useState(null);
    const [localNickname, setLocalNickname] = useState(profile?.nickName || ""); // Local state for nickname

    const updateProfile = async (e) => {
        e.preventDefault();
        const packet = { id: profile.id, nickName: localNickname, img: image };

        await dispatch(fetchCredStart());
        await dispatch(fetchAsyncUpdateProf(packet));
        await dispatch(fetchCredEnd());
        await dispatch(resetOpenProfile());
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    };

    return (
        <Modal
        isOpen={openProfile}
        onRequestClose={async () => {
            await dispatch(resetOpenProfile());
        }}
        style={customStyles}
        >
        <form className={styles.core_signUp}>
            <h1 className={styles.core_title}>Account</h1>
            <br />
            <TextField
            placeholder="nickname"
            type="text"
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)} // Update local state
            />
            <input
            type="file"
            id="imageInput"
            hidden={true}
            onChange={(e) => setImage(e.target.files[0])}
            />
            <br />
            <IconButton onClick={handleEditPicture}>
            <MdAddAPhoto />
            </IconButton>
            <br />
            <Button
            disabled={!localNickname}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateProfile}
            >
            Update
            </Button>
        </form>
        </Modal>
    );
};

export default EditProfile;



// import React, { useState } from "react";
// import Modal from "react-modal";
// import styles from "./Core.module.css";

// import { useSelector, useDispatch } from "react-redux";

// import {
//     editNickname,
//     selectProfile,
//     selectOpenProfile,
//     resetOpenProfile,
//     fetchCredStart,
//     fetchCredEnd,
//     fetchAsyncUpdateProf,
//     } from "../auth/authSlice";

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

//     const EditProfile = () => {
//     const dispatch = useDispatch();
//     const openProfile = useSelector(selectOpenProfile);
//     const profile = useSelector(selectProfile);
//     const [image, setImage] = useState(null);



//     const updateProfile = async (e) => {
//         e.preventDefault();
//         const packet = { id: profile.id, nickName: profile.nickName, img: image };

//         await dispatch(fetchCredStart());
//         await dispatch(fetchAsyncUpdateProf(packet));
//         await dispatch(fetchCredEnd());
//         await dispatch(resetOpenProfile());
//     };




//     const handlerEditPicture = () => {
//         const fileInput = document.getElementById("imageInput");
//         fileInput?.click();
//     };




//     return (
//         <>
//         <Modal
//             isOpen={openProfile}
//             onRequestClose={async () => {
//             await dispatch(resetOpenProfile());
//             }}
//             style={customStyles}
//         >
//             <form className={styles.core_signUp}>
//             <h1 className={styles.core_title}>Account</h1>

//             <br />
//             <TextField
//                 placeholder="nickname"
//                 type="text"
//                 value={profile?.nickName}
//                 onChange={(e) => dispatch(editNickname(e.target.value))}
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
//                 disabled={!profile?.nickName}
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 onClick={updateProfile}
//             >
//                 Update
//             </Button>
//             </form>
//         </Modal>
//         </>
//     );
// };

// export default EditProfile;
