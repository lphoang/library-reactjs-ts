import React from 'react';
import "./Navbar.scss"
import { Link } from 'react-router-dom';
import { NavMenu } from 'utils/types';
import { useAppSelector } from 'app/hooks';
import { selectIsLogged } from 'features/slices/authSlice';
import SearchForm from './SearchForm';

const navMenu: NavMenu[] = [{
    name: 'Home',
    url: '/',
    className: 'btn'
},
{
    name: 'Login',
    url: '/login',
    className: 'btn'
}];

const navMenuLoggedIn: NavMenu[] = [{
    name: 'Home',
    url: '/',
    className: 'btn'
},
{
    name: 'Logout',
    url: '/logout',
    className: 'btn'
}]

function Navbar() {
    const isLogged = useAppSelector(selectIsLogged);

    return (
        <div className="nav__container">
            <div className="nav__menu">
                <div className="nav__icon">
                    <img src="https://pbs.twimg.com/profile_images/1238211348183412736/IBJfsrHo_400x400.jpg" alt="icon" />
                    <h1>Thriftbooks</h1>
                </div>
                <div className="search__form">
                    <SearchForm />
                </div>
                <div className="nav__items">
                    {isLogged ?
                        navMenuLoggedIn.map((item) => {
                            return (
                                <div key={navMenuLoggedIn.indexOf(item)}>
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
                        })
                        :
                        navMenu.map((item) => {
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
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;

