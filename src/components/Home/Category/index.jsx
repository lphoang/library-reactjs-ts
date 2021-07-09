import React from 'react';
import { ChevronDownOutline } from 'react-ionicons'
import './Category.scss'

function Category() {
    return (
        <div className="categories__container">
            <ul className="categories__menu">
                <li className="category__item">Feautured
                    <ChevronDownOutline
                        color={'white'}
                        cssClasses='category__icon'
                    />
                </li>
                <li className="category__item">
                    Books
                    <ChevronDownOutline
                        color={'white'}
                        cssClasses='category__icon'
                    />
                </li>
            </ul>
        </div>
    );
}

export default Category;