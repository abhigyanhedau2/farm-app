import React, { useEffect } from 'react';
import About from '../components/About/About';
import Categories from '../components/Categories/Categories';
import Features from '../components/Features/Features';
import Header from '../components/Header/Header';

const Home = () => {

    // backdropContext.setShowBackdrop(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <Categories />
            <Features />
            <About />
        </div>
    )
};

export default Home;