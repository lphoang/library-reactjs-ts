import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/Global/Loading';
import { getAllBooks } from 'features/slices/bookSlice';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BookCard from '../Global/BookCard';
import './Books.scss'

function Books() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const { page } = useParams();
    const { size } = useParams();

    const [pagination, setPagination] = useState({
        currentPage: page,
        totalItems: 100,
        totalPages: 7,
    })

    useEffect(() => {
        dispatch(getAllBooks(pagination.currentPage, size));
    }, [dispatch, pagination, size]);

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
                        <Link to={`/page=${page}&size=15`} key={index}>
                            <div
                                className={`paginationDot${pagination.currentPage === index ? " active" : ""}`}
                                onClick={() => setPagination({
                                    ...pagination,
                                    currentPage: page
                                })}
                            ></div>
                        </Link>
                    ))}
                </div>
            </section>

        </>

    );
}

export default Books;