import { useAppDispatch, useAppSelector } from 'app/hooks';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';
import Navbar from 'components/Global/Navbar';
import { getUserInfo } from 'features/slices/userSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Delivery to</th>
                                        <th>Payment method</th>
                                        <th>Paid at</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.user.user.checkoutCart && state.user.user.checkoutCart.map((cart: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{cart.deliveryAddress}</td>
                                            <td>{cart.paymentType}</td>
                                            <td>{cart.checkedOutAt && cart.checkedOutAt.slice(0, 5).join(" : ")}</td>
                                            <td>
                                                <Link to={`/orders/${cart.id}`}>
                                                    Click here
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserProfile;