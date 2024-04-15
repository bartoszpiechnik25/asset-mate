import React from "react";
import "./Login.css";
import Button from "../components/Button";

function Login() {
    document.body.style.backgroundColor = "#222831";    
    return (
        <div className="login">
            <div className="login-container">
                <h1>AssetMate</h1>
                <h2>email</h2>
                <input
                    type="text"
                    placeholder="email"
                />
                <h2>password</h2>
                <input
                    type="password"
                    placeholder="password"
                />
                <a>Forgot your password?</a>
                <Button
                    text="Login"
                    onClick={()=>{console.log("Login clicked")}}
                />
                <Button
                    text="Register"
                    onClick={()=>{console.log("Register Clicked")}}
                />
            </div>
        </div>
    );
}

export default Login
