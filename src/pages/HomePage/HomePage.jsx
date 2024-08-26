// src/pages/HomePage.jsx
import React from "react";
import { useInitialFetch } from "../../hooks/useInitialFetch";

const HomePage = () => {

    useInitialFetch();

    
    return (
        <>
            <h1>Welcome to the Home Page</h1>;
        </>
    )
};

export default HomePage;