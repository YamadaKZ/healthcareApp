// src/routes/AppRoutes.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectProfile } from "../features/auth/authSlice";
// import HomePage from "../pages/HomePage";
// import BlogPage from "../pages/BlogPage";
// import BodyIndexPage from "../pages/BodyIndex";
// import CaloriePage from "../pages/CaloriePage";
// import DashboardPage from "../pages/DashboardPage";

// const PrivateRoute = ({ children }) => {
//     const profile = useSelector(selectProfile);
//     return profile?.nickName ? children : <Navigate to="/" />;
//     };

//     const AppRoutes = () => {
//     return (
//         <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/blog" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
//         <Route path="/body-index" element={<PrivateRoute><BodyIndexPage /></PrivateRoute>} />
//         <Route path="/calorie" element={<PrivateRoute><CaloriePage /></PrivateRoute>} />
//         <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
//         </Routes>
//     );
// };

// export default AppRoutes;


// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProfile } from "../features/auth/authSlice";
import LoginPage from "../pages/LoginPage/LoginPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import BodyIndexPage from "../pages/BodyIndexPage/BodyIndex";
import CaloriePage from "../pages/CaloriePage/CaloriePage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import HomePage from "../pages/HomePage/HomePage";



const PrivateRoute = ({ children }) => {
    const profile = useSelector(selectProfile);
    return profile?.nickName ? children : <Navigate to="/login" />;
    };
    

    const AppRoutes = () => {
    return (
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/blog" element={<PrivateRoute><BlogPage /></PrivateRoute>} />
        <Route path="/body-index" element={<PrivateRoute><BodyIndexPage /></PrivateRoute>} />
        <Route path="/calorie" element={<PrivateRoute><CaloriePage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;