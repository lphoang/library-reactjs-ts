import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllBooks } from 'features/slices/bookSlice';
import React, { useEffect } from 'react';
import BookCard from './BookCard';
import './Books.scss'

function Books() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch]);

    return (
        <section>
            <div className="book__cards__container">
                {state.books && state.books.books.map((book) => (
                    <BookCard
                        key={book.id}
                        thumbnail={book.thumbnail}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        price={book.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default Books;