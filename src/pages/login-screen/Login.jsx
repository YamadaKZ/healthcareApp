import React from "react";
import LoginInput from "./LoginInput";
import './Login.scss'


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-header">
                    <h1>Hermes</h1>
                    <h2>
                        What You Eat Is Waht You Are 
                    </h2>
                </div>
                <div className="LoginInput">
                    <LoginInput/>
                </div>
            </div>
        </div>
    )
}

export default Login