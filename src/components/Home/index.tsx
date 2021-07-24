import React, { useEffect } from 'react';
import Navbar from '../Global/Navbar'
import HeroSlider from './HeroSlider';
import Category from '../Global/Category';
import Books from 'components/Books';

function Home() {
    useEffect(() => {
        document.title = `Thriftbooks | Home`
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    
    return (
        <>
            <Navbar/>
            <Category/>
            <HeroSlider/>
            <Books/>
        </>
    );
}

export default Home;
