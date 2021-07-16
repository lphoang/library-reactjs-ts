import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllGenres } from 'features/slices/genreSlice';
import React, { useEffect } from 'react';
import { ChevronDownOutline, ChevronForwardOutline } from 'react-ionicons'
import { Link } from 'react-router-dom';
import './Category.scss'

function Category() {

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])

    useEffect(() => {

    }, [state.genres.genre.id])


    return (
        <div className="categories__container">
            <ul className="categories__menu">
                <li className="category__items">Genres
                    <ChevronDownOutline
                        color={'white'}
                        cssClasses='category__icon'
                    />
                    <div className="category__item">
                        {state.genres.genres && state.genres.genres.map((genre) => (
                            <Link to={`/genres/${genre.id}`}
                                key={genre.id}
                                style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                            >
                                <p>{genre.title}</p>
                            </Link>
                        ))}
                    </div>
                </li>
                {state && (
                    <li className="category__items">
                        <ChevronForwardOutline
                            color={"#689775"}
                            style={{
                                marginRight: "2rem",
                                cursorPointer: "none"
                            }}
                        />
                        <Link to={`/genres/${state.books.book.bookGenre.id}`}
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            {state.genres.genre ? state.genres.genre.title : state.books.book.bookGenre.title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Category;