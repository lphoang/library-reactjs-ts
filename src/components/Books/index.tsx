import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/Global/Loading';
import { getAllBooks } from 'features/slices/bookSlice';
import React, { useEffect, useState } from 'react';
import BookCard from '../Global/BookCard';
import './Books.scss'

function Books() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalItems: 80,
        totalPages: 6,
    })

    useEffect(() => {
        dispatch(getAllBooks(pagination.currentPage, 15));
    }, [dispatch, pagination]);

    const pagesArray = Array.from(Array(pagination.totalPages).keys());


    return (
        <>
            {state.books.apiState.isLoading && <Loading />}
            <section>
                <div className="book__cards__container">
                    {state.books.books && state.books.books.map((book) => (
                        <BookCard
                            key={book.id}
                            thumbnail={book.thumbnail}
                            id={book.id}
                            title={book.title}
                            author={book.author.fullName}
                            price={book.price}
                        />
                    ))}
                </div>
                <div className="pagination">
                    {pagesArray && pagesArray.map((page, index) => (
                        <div
                            key={index}
                            className={`paginationDot${pagination.currentPage === index ? " active" : ""}`}
                            onClick={() => setPagination({
                                ...pagination,
                                currentPage: page
                            })}
                        ></div>
                    ))}
                </div>
            </section>

        </>

    );
}

export default Books;