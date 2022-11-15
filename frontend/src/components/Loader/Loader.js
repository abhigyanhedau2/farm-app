import React from 'react';

import Card from '../UIElements/Card/Card';

import cartLoaderImg from '../../assets/shopping-cart.gif'
import classes from './Loader.module.css';
import { useEffect } from 'react';

const Loader = () => {

    const body = document.getElementsByTagName("BODY")[0];
    body.classList.add('lock-screen');

    useEffect(() => {
        return () => {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.remove('lock-screen');
        };
    }, []);

    return (
        <div className={classes.overlay}>
            <Card className={classes.cartLoaderWrapper}>
                <img src={cartLoaderImg} alt={cartLoaderImg} />
                <p>Loading...</p>
            </Card>
        </div>
    )
};

export default Loader;