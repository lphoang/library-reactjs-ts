import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss'

function VerifyEmail() {
    useEffect(() => {
        document.title = `Thriftbooks | Verify email`
    });

    return (
        <div className="verify-email__container">
            <h1>Verify your email to login</h1>
            <Link to='/'>
                <button className="btn">
                    <span>
                        Back to home page
                    </span>
                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5" />
                        <polyline points="8 1 12 5 8 9" />
                    </svg>
                </button>
            </Link>
        </div>
    );
}

export default VerifyEmail;