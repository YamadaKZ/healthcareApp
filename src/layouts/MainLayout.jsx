// src/layouts/MainLayout.jsx
import React from "react";
import Header from "../components/header/Header";

const MainLayout = ({ children }) => {
    return (
        <div>
        <Header />
        <main>{children}</main>
        </div>
    );
};

export default MainLayout;
