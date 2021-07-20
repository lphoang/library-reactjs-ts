import { useAppDispatch, useAppSelector } from 'app/hooks';
import Category from 'components/Global/Category';
import Navbar from 'components/Global/Navbar';
import { addToCart, getCartItems, removeFromCart } from 'features/slices/userSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./Cart.scss"

function Cart() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getCartItems(state.auth.accessToken, id))
    }, [dispatch])

    const onRemoveItem = (bookId: string) => {
        dispatch(removeFromCart(state.auth.accessToken, bookId, id));
        alert("Remove successly");
    }

    const onAddItem = (bookId: string) => {
        dispatch(addToCart(state.auth.accessToken, bookId, id));
        alert("Add successly");
    }

    return (
        <>
            <Navbar />
            <Category />
            {state.user.carts ?
                <div>
                    <section className="container">
                        <ul className="books">
                            {state.user.carts && state.user.carts.map((cart, index) => {
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
                                                <button onClick={() => onRemoveItem(cart.book.id)}>
                                                    -
                                                </button>
                                                <button onClick={() => onAddItem(cart.book.id)}>
                                                    +
                                                </button>
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
                                <li>
                                    Subtotal <span>${"subTotal"}</span>
                                </li>
                                <li className="total">
                                    Total <span>${"total"}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="checkout">
                            <button type="button" className="btn">
                                <span>
                                    Check out
                                </span>
                                <svg width="13px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5" />
                                    <polyline points="8 1 12 5 8 9" />
                                </svg></button>
                        </div>
                    </section>
                </div>
            : <div>
                <h1> There is no items in cart </h1>
            </div>}
        </>
    );
}

export default Cart;