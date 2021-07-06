import React from 'react';
import './Login.scss'

const url = "https://mailtrap.io/inboxes/1393123/messages/2264914102"
function VerifyEmail() {
    return (
        <div className="verify-email__container">
            <h1>Verify your email to login</h1>
            <a href={url} className="btn-link">
                <button>
                    Click here
                </button>
            </a>
        </div>
    );
}

export default VerifyEmail;