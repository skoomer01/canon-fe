import React from "react";
import "./LogInForm.css";

function LoginForm() {

    return (
        <div>
            <img src="https://media.discordapp.net/attachments/1098263067722268772/1100090047925059634/Canon-Logo.png" alt="Canon logo"></img>
            <div className="login-form-container">
                <form className="login-form">
                    <h2 className="login-heading">Log in</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button className="login-btn">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
