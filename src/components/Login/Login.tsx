import React, {useEffect} from 'react';
import {Link} from "react-router-dom"

import LoginImage from 'assets/images/old-library-book.jpg'
import "./Login.scss"

function Login() {
    useEffect(() => {
        document.title = `Login`
    });

    return (
        <div className="login-container">
            <img src={LoginImage} className="login-image" alt=""/>
            <div className="login-form">
                <h1>Welcome back</h1>
                <hr/>
                <form action="">
                    <div>
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder="Enter your username"/>
                    </div>
                    <hr/>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="text" placeholder="Enter your password"/>
                    </div>
                    <hr/>
                    <p>Don't have account yet?
                        <Link to="/sign-up" className="p-link">
                            Join us
                        </Link>
                    </p>
                    <Link to="/" className="btn-link">
                        <button type="submit">
                            Login
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
