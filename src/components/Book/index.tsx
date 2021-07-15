import { useAppDispatch, useAppSelector } from 'app/hooks';
import Navbar from 'components/Global/Navbar';
import { getBook } from 'features/slices/bookSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Book.scss'
import RatingStar from 'components/Global/RatingStar';


function Book() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state);

    useEffect(() => {
        dispatch(getBook(id))
    }, [dispatch, id])

    return (
        <div>
            <Navbar />
            <div className="book__container">
                <div className="book">
                    <div className="book__image">
                        <img src={state.books.book.thumbnail} alt="featured_book" />
                    </div>
                    <div className="book__content">
                        <h1>{state.books.book.title}</h1>
                        <p>by <span>
                            {state.books.book.author}
                        </span> </p>
                        <div className="book__content--description">
                            <h4>Overview:</h4>
                            <p>{state.books.book.description}</p>
                        </div>
                        <div className="book__content--score">
                            <RatingStar
                                count={5}
                                rating={state.books.book.score}
                                color={{
                                    "filled": "#F5EB3B",
                                    "unfilled": "#DCDCDC",
                                }}
                            />
                        </div>

                        <div className="book__content--price">
                            <h1>From: <span>
                                {state.books.book.price} $
                            </span></h1>
                        </div>

                        <div className="book__content--price">

                        </div>
                        <button className="btn">
                            <span>
                                Add to cart
                            </span>
                            <svg width="13px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5" />
                                <polyline points="8 1 12 5 8 9" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Book;