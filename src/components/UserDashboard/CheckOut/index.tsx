import { useAppSelector, useAppDispatch } from "app/hooks";
import { checkOut } from "features/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ICheckout } from "utils/types";
import './CheckOut.scss'

function CheckOut() {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const initialValues: ICheckout = {
        token: state.auth.accessToken,
        orderId: "",
        deliveryAddress: "",
        paymentType: ""
    }
    const [show, setShow] = useState(false);
    const [checkout, setCheckout] = useState(initialValues);
    const toggleShow = () => setShow(!show);

    useEffect(() => {
        if (state.user.carts.length > 0) {
            let cart = state.user.carts.filter((cart) => !cart.isPaid)
            if (cart.length > 0) {
                setCheckout({ ...checkout, orderId: cart[0].id })
            }
        }
    }, [])
    const history = useHistory();
    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(checkOut(checkout));
        toggleShow();
        alert("Check out successfully!");
        const timer = setTimeout(() => {
            history.push("/")
        }, 1000)
        return () => clearTimeout(timer)
    }


    const showHideClassName = show ? 'modal display-block' : 'modal display-none';


    return (
        <div className="checkout__container">
            <button type="button" className="btn" onClick={toggleShow}>
                <span>
                    Check out
                </span>
                <svg width="13px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5" />
                    <polyline points="8 1 12 5 8 9" />
                </svg></button>
            <div className={showHideClassName}>
                <section className='modal-main'>
                    <div className="modal--container">
                        <div className="modal--header">
                            <h1>Checkout</h1>
                        </div>
                        <div className="form-checkout">
                            <form onSubmit={onSubmitHandler}>
                                <div className="payment--type">
                                    <label>Choose payment method: </label>
                                    <select
                                        value={checkout.paymentType}
                                        onChange={(e) =>
                                            setCheckout({ ...checkout, paymentType: e.target.options[e.target.selectedIndex].text })}>
                                        <option value="COD">COD</option>
                                        <option value="CARD">CARD</option>
                                    </select>
                                </div>
                                <hr />
                                <div className="delivery--address">
                                    <label>Enter your address: </label>
                                    <input type="text"
                                        value={checkout.deliveryAddress}
                                        placeholder="Enter delivery address"
                                        onChange={
                                            (e) => setCheckout({
                                                ...checkout, deliveryAddress: e.target.value
                                            })
                                        } />
                                </div>
                                <button
                                    type="submit"
                                    className="button button--mimas"
                                >
                                    Check out
                                </button>
                            </form>
                            <div className="modal--footer">
                                <button
                                    className="button button--mimas"
                                    onClick={toggleShow}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    )
}






export default CheckOut;