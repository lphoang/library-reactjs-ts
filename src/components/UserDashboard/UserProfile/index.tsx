import { useAppDispatch, useAppSelector } from 'app/hooks';
import PurchaseHistories from '../PurchaseHistories';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';
import Navbar from 'components/Global/Navbar';
import { getUserInfo } from 'features/slices/userSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.scss'
function UserProfile() {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getUserInfo(state.auth.accessToken, id))
        })
        return () => clearTimeout(timer)
    }, [dispatch, state.auth.accessToken, id])

    return (
        <>
            <Navbar />
            <Category />
            {state.user.apiState.isLoading && <Loading />}
            <section>
                <div className="user__information">
                    <div className="user__img">
                        <img src="https://source.unsplash.com/random" alt="user" />
                    </div>
                    <div className="user__info">
                        <h1>{`${state.user.user.lastName} ${state.user.user.firstName}`}</h1>
                        <h3>Overview:</h3>
                        <p>
                            <span>Your email: </span>
                            {state.user.user.email}
                            <br />
                            <span>Your age: </span>{state.user.user.age}
                        </p>
                        <h3>Your purchase histories: </h3>
                        <button className="btn">
                            <span>
                                Click here
                            </span>
                            <svg width="13px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5" />
                                <polyline points="8 1 12 5 8 9" />
                            </svg>
                        </button>
                        {/* <PurchaseHistories
                            carts={state.user.user.carts}
                        /> */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserProfile;