import React from 'react';
import { Link } from 'react-router-dom';

function SlideCard(slide: { img: any, title: string, author: string, description: string, link: string }) {
    return (
        <div className="slide">
            <div className="slide__image">
                <img src={slide.img} alt="featured_book" />
            </div>
            <div className="slide__content">
                <h1>{slide.title}</h1>
                <p>by <span>
                    {slide.author}
                </span> </p>
                <div className="slide__content--description">
                    <p>{slide.description}</p>
                </div>
                <Link to={slide.link}>
                    <button className="btn">
                        <span>
                            More details
                        </span>
                        <svg width="13px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5" />
                            <polyline points="8 1 12 5 8 9" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SlideCard;