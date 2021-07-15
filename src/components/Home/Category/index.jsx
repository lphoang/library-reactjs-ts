import React from 'react';
import { ChevronDownOutline } from 'react-ionicons'
import './Category.scss'

function Category() {
    return (
        <div className="categories__container">
            <ul className="categories__menu">
                <li className="category__items">Categories
                    <ChevronDownOutline
                        color={'white'}
                        cssClasses='category__icon'
                    />
                    <div className="category__item">
                        <p>Hello world</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Category;