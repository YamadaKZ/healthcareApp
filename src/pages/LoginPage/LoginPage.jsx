// src/pages/LoginPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectProfile } from "../../features/auth/authSlice";
import Auth from "../../features/auth/Auth";

import Header from "../../components/header/Header";

import "./LoginPage.scss"

const LoginPage = () => {
    const profile = useSelector(selectProfile);

    if (profile?.nickName) {
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <Header/>
            <div className="login-container">
                <h1>Helmes</h1>
                <p>What you eat is what you are</p>
                <p>Having healthy meat is </p>
                <p>a key ingradeents</p>
                <p>to Happy Life</p>
                <Auth />
            </div>
        </div>
    );
};

export default LoginPage;