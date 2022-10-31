import React from 'react';
import Categories from '../components/Categories/Categories';
import Features from '../components/Features/Features';
import Header from '../components/Header/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <Categories />
            <Features />
        </div>
    )
};

export default Home;