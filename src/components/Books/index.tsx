import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/Global/Loading';
import { getAllBooks } from 'features/slices/bookSlice';
import React, { useEffect } from 'react';
import BookCard from '../Global/BookCard';
import './Books.scss'

function Books() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch]);

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
            </section>
        </>

    );
}

export default Books;