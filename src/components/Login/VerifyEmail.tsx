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
            <button className="btn-link">
                <Link to='/'>
                    Accept
                </Link>
            </button>
        </div>
    );
}

export default VerifyEmail;