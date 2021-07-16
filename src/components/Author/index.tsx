import { useAppDispatch, useAppSelector } from 'app/hooks';
import BookCard from 'components/Global/BookCard';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';
import Navbar from 'components/Global/Navbar';
import { getAuthor } from 'features/slices/authorSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'components/Books/Books.scss'

function Author() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state);

    useEffect(() => {
        dispatch(getAuthor(id))
    }, [dispatch, id])

    useEffect(() => {
        document.title = `${state.authors.author.fullName}`
    }, [state.authors.author])

    return (
        <>
            <Navbar />
            <Category />
            {state.authors.apiState.isLoading && <Loading />}
            <section>
                <div className="book__cards__container">
                    {state.authors.author && state.authors.author.books.map((book: any) => (
                        <BookCard
                            key={book.id}
                            thumbnail={book.thumbnail}
                            id={book.id}
                            title={book.title}
                            author={state.authors.author.fullName}
                            price={book.price}
                        />
                    ))}
                </div>
            </section>
        </>

    );
}

export default Author;