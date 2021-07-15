import React, { FC, useMemo } from 'react';
import PropTypes from "prop-types";
import { Star } from 'react-ionicons'


interface RatingProps {
    count: number,
    rating: number,
    color: {
        filled: string,
        unfilled: string,
    }
}

const RatingStar: FC<RatingProps> = ({ count, rating, color }) => {

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map(idx => {
                if(idx <= Math.ceil(rating)) {
                    return (
                        <Star 
                            key={idx}
                            color={color.filled}
                        />
                    )
                }
                return (
                    <Star
                        key={idx}
                        color={color.unfilled}
                    />
                )
            })
    }, [color, count, rating])

    return (
        <div>
            {starRating}
        </div>
    );
}

RatingStar.propTypes = {
    count: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    color: PropTypes.any
}

RatingStar.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#F5EB3B",
        unfilled: "#DCDCDC"
    }
}

export default RatingStar;