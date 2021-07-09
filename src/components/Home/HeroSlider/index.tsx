import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CaretBack, CaretForward } from 'react-ionicons';
import { LIBRARY_IMAGES } from 'constants/image';

import './HeroSlider.scss'

function HeroSlider() {

    const sliders = LIBRARY_IMAGES;
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
            () => handleSlideNext(),
            3000
        );

        return () => {
            resetTimeout();
        };
    }, [index])


    const handleSlidePrev = useCallback(() => {
        setIndex((prevIndex: number) => (prevIndex - 1 + sliders.length) % sliders.length)
    }, [])
    const handleSlideNext = useCallback(() => {
        setIndex((prevIndex: number) => (prevIndex + 1) % sliders.length)
    }, [])

    return (
        <div className="hero__container">
            <div className="slider__container"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {sliders.map((img, index) => (
                    <img key={index} src={img} alt="library" className="slide" />
                ))}
            </div>
            <div className="caret__container">
                <div className="caret__item prev">
                    <CaretBack
                        color={"white"}
                        onClick={handleSlidePrev}
                    />
                </div>
                <div className="slide__dots">
                    {sliders.map((_, idx) => (
                        <div
                            key={idx}
                            className={`slide__dot${index === idx ? " active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}
                        ></div>
                    ))}
                </div>
                <div className="caret__item next">
                    <CaretForward
                        color={"white"}
                        onClick={handleSlideNext}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroSlider;