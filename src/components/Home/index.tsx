import React from 'react';
import Navbar from '../Global/Navbar'
import HeroSlider from './HeroSlider';
import Category from './Category';

function Home() {
    return (
        <>
            <Navbar/>
            <Category/>
            <HeroSlider/>
        </>
    );
}

export default Home;
