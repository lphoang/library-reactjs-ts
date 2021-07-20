import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import LoginImage from 'assets/images/old-library-book.jpg'
import "./Login.scss"
import ApiState from 'components/Global/ApiState';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authLogin, selectApiState, selectIsLogged } from 'features/slices/authSlice';

function Login() {
    const apiState = useAppSelector(selectApiState);
    const isLogged = useAppSelector(selectIsLogged);
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        document.title = `Thriftbooks | Login`
    });

    useEffect(() => {
        isLogged && history.push('/')
    }, [isLogged])

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log("Trying to login", { email, password });
        dispatch(authLogin({ email, password }));
        // const timer = setTimeout(() => {
        //     !state.auth.user.enabled && history.push('/verify-email')
        // }, 3000)
        // return () => clearTimeout(timer)
    }

    return (
        <div className="login-container">
            <img src={LoginImage} className="login-image" alt="" />
            <div className="login-form">
                <h1>Welcome back</h1>
                <hr />
                <ApiState {...apiState} />
                <hr />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            } />
                    </div>
                    <hr />
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={
                                (e) => setPassword(e.target.value)
                            } />
                    </div>
                    <hr />
                    <p>Don't have account yet?
                        <Link to="/register" className="p-link">
                            Join us
                        </Link>
                    </p>
                    <p>Back to home page?
                        <Link to="/" className="p-link">
                            Click here
                        </Link>
                    </p>
                    <div className="btn-link">
                        <button type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
