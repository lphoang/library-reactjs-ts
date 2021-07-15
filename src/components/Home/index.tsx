import React, { useEffect } from 'react';
import Navbar from '../Global/Navbar'
import HeroSlider from './HeroSlider';
import Category from './Category';
import Books from 'components/Books';

function Home() {
    useEffect(() => {
        document.title = `Thriftbooks | Home`
    });
    
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
