import { useAppDispatch, useAppSelector } from 'app/hooks';
import BookCard from 'components/Global/BookCard';
import Loading from 'components/Global/Loading';
import Navbar from 'components/Global/Navbar';
import { getBookByTitle } from 'features/slices/bookSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'components/Books/Books.scss'

function SearchResult() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const { t } = useParams();

    useEffect(() => {
        dispatch(getBookByTitle(t))
    }, [t])

    return (
        <>
            <Navbar />
            {state.books.apiState.isLoading && <Loading />}
            <section>
                <h1 style={{ "color": "white" }}>
                    {`${state.books.searchBooks ? state.books.searchBooks.length : 0} results for searching by "${t}"`}</h1>
                <div className="book__cards__container">
                    {state.books.searchBooks && state.books.searchBooks.map((book: any) => (
                        <BookCard
                            key={book.id}
                            thumbnail={book.thumbnail}
                            id={book.id}
                            title={book.title}
                            author={"unknown"}
                            price={book.price}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default SearchResult;