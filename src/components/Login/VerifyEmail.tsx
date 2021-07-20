import { useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.scss'

function VerifyEmail() {
    const state = useAppSelector((state) => state);

    useEffect(() => {
        document.title = `Thriftbooks | Verify email`
    });
    const url = `${process.env.REACT_APP_BASE_URL}/user/register/confirm?token=${state.auth.verifiedToken}`;
    const history = useHistory();
    const onClickHandler = () => {
        window.open(url);
        const timer = setTimeout(() => {
            history.push('/login');
        }, 5000)
        return () => clearTimeout(timer);
    }

    return (
        <div className="verify-email__container">
            <h1>Verify your email to login</h1>
            <button className="btn" onClick={onClickHandler}>
                <span>
                    Click here
                </span>
                <svg width="13px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5" />
                    <polyline points="8 1 12 5 8 9" />
                </svg>
            </button>
        </div>
    );
}

export default VerifyEmail;