import React, { useState, useContext } from "react";
import "./LogInForm.css";
import LoginAPI from "../apis/loginApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";



function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);



    const handleLogin = (event) => {
        event.preventDefault();
        const credentials = {
            username: username,
            password: password
        }
        LoginAPI.login(credentials)
            .then((response) => {
                console.log(response.status);
                console.log(response.data);
                sessionStorage.setItem("token", response.data.accessToken)
                login();
                navigate('/')
                
                window.location.reload();
            })
            .catch(function (error) {
                sessionStorage.removeItem("token")
                console.log(error);
                alert("Login failed! Check your username and password!")
            });
    };

    return (
        <div>
            <img src="https://media.discordapp.net/attachments/1098263067722268772/1100090047925059634/Canon-Logo.png" alt="Canon logo"></img>
            <div className="login-form-container">
                <form className="login-form">
                    <h2 className="login-heading">Log in</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button onClick={handleLogin} className="login-btn">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
