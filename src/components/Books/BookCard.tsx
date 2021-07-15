import React from 'react';
import { Link } from 'react-router-dom';

function BookCard(book: { id: string, thumbnail: string, title: string, author: string, price: number }) {
    const url = `/books/${book.id}`;
    return (
        <div className="card">
            <Link to={url} style={{"textDecoration" : "none"}}>
                <div className="card__container">
                    <div className="img__card">
                        <img src={book.thumbnail} alt="thumbnail" />
                    </div>
                    <div className="content__card">
                        <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                        <h4>from {book.price} $</h4>
                    </div>
                </div>
            </Link>
        </div >
    );
}

export default BookCard;