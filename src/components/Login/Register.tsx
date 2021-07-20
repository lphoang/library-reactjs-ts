import { useAppDispatch, useAppSelector } from 'app/hooks';
import ApiState from 'components/Global/ApiState';
import { authRegister, selectApiState, selectIsLogged } from 'features/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom"

import LoginImage from '../../assets/images/old-library-book.jpg'
import "./Login.scss"

function SignUp() {
    const apiState = useAppSelector(selectApiState);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        password: '',
    })
    const history = useHistory();

    useEffect(() => {
        document.title = `Thriftbooks | Register`
    });

    useEffect(() => {
        apiState.isSuccess && history.push('/verify-email');
    },[apiState.isSuccess])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Trying to register", user);
        dispatch(authRegister(user));
    }
    return (
        <div className="login-container">
            <img src={LoginImage} className="login-image" alt="" />
            <div className="login-form">
                <h1>Create an account</h1>
                <hr />
                <ApiState {...apiState} />
                <hr />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Firstname</label>
                        <input 
                        type="text" 
                        placeholder="Enter your first name" 
                        value={user.firstName}
                        onChange={
                            (e) => setUser({
                                ...user, firstName : e.target.value
                            })
                        }/>
                    </div>
                    <hr />
                    <div>
                        <label>Lastname</label>
                        <input 
                        type="text" 
                        placeholder="Enter your last name" 
                        value={user.lastName}
                        onChange={
                            (e) => setUser({
                                ...user, lastName : e.target.value
                            })
                        }/>
                    </div>
                    <hr />
                    <div>
                        <label>Age</label>
                        <input 
                        type="text" 
                        placeholder="Enter your age" 
                        value={user.age}
                        onChange={
                            (e) => setUser({
                                ...user, age : +e.target.value
                            })
                        }/>
                    </div>
                    <hr />
                    <div>
                        <label>Email</label>
                        <input 
                        type="email" 
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={
                            (e) => setUser({
                                ...user, email : e.target.value
                            })
                        }/>
                    </div>
                    <hr />
                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={user.password}
                        onChange={
                            (e) => setUser({
                                ...user, password : e.target.value
                            })
                        }/>
                    </div>
                    <hr />
                    <p>Already have an account?
                        <Link to="/login" className="p-link">
                            Login
                        </Link>
                    </p>
                    <p>Back to home page?
                        <Link to="/" className="p-link">
                            Click here
                        </Link>
                    </p>
                    <div className="btn-link">
                        <button type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
