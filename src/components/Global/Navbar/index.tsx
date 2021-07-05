import React from 'react';
import "./Navbar.scss"
import { Link } from 'react-router-dom';

interface NavMenu {
    name: string,
    url: string,
    className: string,
}

const navMenu: NavMenu[] = [{
    name: 'Home',
    url: '/',
    className: 'nav__item'
},
{
    name: 'Login',
    url: '/login',
    className: 'nav__item'
}];

function Navbar() {
    return (
        <div className="nav__container">
            <div className="nav__menu">
                {navMenu.map((item) => {
                    return (
                        <div key={navMenu.indexOf(item)}>
                            <Link to={item.url}>
                                <button className={item.className}>
                                    <span>
                                        {item.name}
                                    </span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5" />
                                        <polyline points="8 1 12 5 8 9" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Navbar;

