import { useAppDispatch, useAppSelector } from 'app/hooks';
import BookCard from 'components/Global/BookCard';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';
import Navbar from 'components/Global/Navbar';
import { getGenre } from 'features/slices/genreSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'components/Books/Books.scss'

function Genre() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state);

    useEffect(() => {
        dispatch(getGenre(id))
    }, [dispatch, id])

    useEffect(() => {
        document.title = `${state.genres.genre.title}`
    }, [state.genres.genre])

    return (
        <>
            <Navbar />
            <Category />
            {state.genres.apiState.isLoading && <Loading />}
            <section>
                <div className="book__cards__container">
                    {state.genres.genre && state.genres.genre.books.map((book: any) => (
                        <BookCard
                            key={book.id}
                            thumbnail={book.thumbnail}
                            id={book.id}
                            title={book.title}
                            author={""}
                            price={book.price}
                        />
                    ))}
                </div>
            </section>
        </>

    );
}

export default Genre;