import React, {useEffect} from 'react';
import {Link} from "react-router-dom"

import LoginImage from '../../assets/images/old-library-book.jpg'
import "./Login.scss"

function SignUp() {
    useEffect(() => {
        document.title = `Sign up`
    });

    return (
        <div className="login-container">
            <img src={LoginImage} className="login-image" alt=""/>
            <div className="login-form">
                <h1>Create an account</h1>
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
                    <p>Already have an account?
                        <Link to="/login" className="p-link">
                            Login
                        </Link>
                    </p>
                    <Link to="/" className="btn-link">
                        <button type="submit">
                            Sign up
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
