// src/components/Header.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar, CircularProgress, Badge } from "@mui/material";
import { MdAddAPhoto } from "react-icons/md";
import { styled } from "@mui/material/styles";
import {
    editNickname,
    resetOpenProfile,
    setOpenSignIn,
    setOpenProfile,
    selectProfile,
    selectIsLoadingAuth,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    } from "../features/auth/authSlice";
    import 
    { 
        selectIsLoadingPost,
        resetOpenNewPost,
        setOpenNewPost,
    } from "../features/post/postSlice";

    import styles from "./Header.module.css";
import EditProfile from "../features/core/EditProfile";
import Auth from "../features/auth/Auth";

    const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
        transform: "scale(.8)",
        opacity: 1,
        },
        "100%": {
        transform: "scale(2.4)",
        opacity: 0,
        },
    },
    }));

    const Header = () => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const isLoadingPost = useSelector(selectIsLoadingPost);
    const isLoadingAuth = useSelector(selectIsLoadingAuth);

    return (
        <div className={styles.core_header}>
            <Auth/>
            <EditProfile/>
        <h1 className={styles.core_title}>Helmes</h1>
        {profile?.nickName ? (
            <>
            <button
                className={styles.core_btnModal}
                onClick={() => {
                dispatch(setOpenNewPost());
                dispatch(resetOpenProfile());
                }}
            >
                <MdAddAPhoto />
            </button>
            <div className={styles.core_logout}>
                {(isLoadingPost || isLoadingAuth) && <CircularProgress />}
                <Button
                onClick={() => {
                    localStorage.removeItem("localJWT");
                    dispatch(editNickname(""));
                    dispatch(resetOpenProfile());
                    dispatch(resetOpenNewPost());
                    dispatch(setOpenSignIn());
                }}
                >
                Logout
                </Button>
                <button
                className={styles.core_btnModal}
                onClick={() => {
                    dispatch(setOpenProfile());
                    dispatch(resetOpenNewPost());
                }}
                >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                    }}
                    variant="dot"
                >
                    <Avatar alt="who?" src={profile.img} />{" "}
                </StyledBadge>
                </button>
            </div>
            </>
        ) : (
            <div>
            <Button
                onClick={() => {
                dispatch(setOpenSignIn());
                dispatch(resetOpenSignUp());
                }}
            >
                LogIn
            </Button>
            <Button
                onClick={() => {
                dispatch(setOpenSignUp());
                dispatch(resetOpenSignIn());
                }}
            >
                SignUp
            </Button>
            </div>
        )}
        </div>
    );
};

export default Header;
