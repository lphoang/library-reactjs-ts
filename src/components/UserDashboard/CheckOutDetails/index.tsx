import { useAppDispatch, useAppSelector } from 'app/hooks';
import Navbar from 'components/Global/Navbar';
import React, { useEffect } from 'react';
import '../Cart/Cart.scss'
import { useParams } from 'react-router-dom';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';
import { useHistory } from 'react-router-dom';
import { getCheckoutCart } from 'features/slices/userSlice';
import { Link } from 'react-router-dom';
import formatDate from 'utils/helpers';

function CheckOutDetails() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state);

    useEffect(() => {
        dispatch(getCheckoutCart(state.auth.accessToken, id))
    }, [dispatch, id, state.auth.accessToken])

    useEffect(() => {
        document.title = `Checked out items`
    })

    const history = useHistory();
    useEffect(() => {
        !state.auth.isLogged && history.push("/login");
    }, [history, state.auth.isLogged])
    let total = 0;

    return (
        <div>
            <Navbar />
            <Category />
            {state.user.apiState.isLoading && <Loading />}
            {state.user.checkedOutCart &&
                <div>
                    <section className="header">
                        <h1>
                            {`Checked out at : ${formatDate(state.user.checkedOutCart.checkedOutAt)}`}
                        </h1>
                        <hr />
                        <h1>
                            {`Delivery to : ${state.user.checkedOutCart.deliveryAddress}`}
                        </h1>
                        <hr />
                        <h1>
                            {`Payment method : ${state.user.checkedOutCart.paymentType}`}
                        </h1>
                    </section>
                    <section className="container">
                        <ul className="books">
                            {state.user.checkedoutCart &&
                                state.user.checkedOutCart.orderDetail.cartList.map((cart: any, index: any) => {
                                    total += cart.total;
                                    return (
                                        <li className="row" key={index}>
                                            <div className="col left">
                                                <div className="thumbnail">
                                                    <Link to={`/books/${cart.book.id}`}>
                                                        <img src={cart.book.thumbnail} alt={cart.book.title} />
                                                    </Link>
                                                </div>
                                                <div className="detail">
                                                    <div className="name">
                                                        <Link to={`/books/${cart.book.id}`}>
                                                            <span>{cart.book.title}</span></Link>
                                                    </div>
                                                    <div className="price"><span>
                                                        $ {cart.book.price}
                                                    </span></div>
                                                </div>
                                            </div>

                                            <div className="col right">
                                                <div className="quantity">
                                                    <p>{cart.quantity}</p>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </section>
                    <section className="container">
                        <div className="summary">
                            <ul>
                                <li className="total">
                                    Total <span>${(total).toFixed(2)}</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            }
        </div>
    );
}


export default CheckOutDetails;