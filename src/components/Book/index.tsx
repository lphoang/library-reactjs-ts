import { useAppDispatch, useAppSelector } from 'app/hooks';
import Navbar from 'components/Global/Navbar';
import { getBook } from 'features/slices/bookSlice';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Book.scss'
import RatingStar from 'components/Global/RatingStar';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';

function Book() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state);

    useEffect(() => {
        dispatch(getBook(id))
    }, [dispatch, id])

    useEffect(() => {
        document.title = `${state.books.book.title}`
    }, [state.books.book])

    return (
        <div>
            <Navbar />
            <Category />
            {state.books.book && (
                <div className="book__container">
                    {state.books.apiState.isLoading && <Loading />}
                    <div className="book">
                        <div className="book__image">
                            <img src={state.books.book.thumbnail} alt="featured_book" />
                        </div>
                        <div className="book__content">
                            <h1>{state.books.book.title}</h1>
                            <p>by
                                <Link to={`/authors/${state.books.book.author.id}`} className="book__content--link">
                                    <span>
                                        {state.books.book.author.fullName}
                                    </span>
                                </Link>
                            </p>
                            <div className="book__content--description">
                                <h3>Overview:</h3>
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
            )}
        </div>
    );
}

export default Book;