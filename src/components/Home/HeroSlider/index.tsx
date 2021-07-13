import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FEATURED_BOOK_IMAGES } from 'constants/image';

import './HeroSlider.scss'
import SlideCard from './SlideCard';

function HeroSlider() {
    const [index, setIndex] = useState(0);

    const timeoutRef = useRef(0);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }


    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => {
                handleSlideNext(FEATURED_BOOK_IMAGES)
            }, 7000
        );

        return () => {
            resetTimeout();
        };
    }, [index])

    const handleSlideNext = useCallback((sliders) => {
        setIndex((prevIndex: number) => (prevIndex + 1) % sliders.length)
    }, [])

    return (
        <div className="hero__container">
            <div className="slider__container"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {FEATURED_BOOK_IMAGES.map((slide, index) => (
                    <SlideCard
                        img={slide.image}
                        index={index}
                        title={slide.title}
                        author={slide.author}
                        description={slide.description}
                    />
                ))}
            </div>
            <div className="slideshowDots">
                {FEATURED_BOOK_IMAGES.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;