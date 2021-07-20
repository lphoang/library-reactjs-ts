import { useAppDispatch, useAppSelector } from 'app/hooks';
import BookCard from 'components/Global/BookCard';
import Category from 'components/Global/Category';
import Loading from 'components/Global/Loading';
import Navbar from 'components/Global/Navbar';
import { getAuthor } from 'features/slices/authorSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'components/Books/Books.scss'
import './Author.scss'

function Author() {
    const { id } = useParams();
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
                <div className="author__information">
                    <div className="author__img">
                        <img src="https://source.unsplash.com/random" alt="author" />
                    </div>
                    <div className="author__info">
                        <h1>{state.authors.author.fullName}</h1>
                        <h3>Overview:</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus optio veniam accusantium cumque aut blanditiis odio eum nostrum ullam quos nisi consequatur, cum, ipsam et maiores possimus qui. Rem dolor consequuntur libero.</p>
                        <h3>Start writing at:</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, consequuntur!</p>
                        <div className="author__books">
                            <h1>Books by {state.authors.author.fullName}</h1>
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
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Author;