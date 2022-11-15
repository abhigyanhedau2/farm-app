import React from 'react';

import cartLoaderImg from '../../assets/shopping-cart.gif'
import classes from './Loader.module.css';
import { useEffect } from 'react';
import Modal from '../UIElements/Modal/Modal';

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
            <Modal className={classes.cartLoaderWrapper}>
                <img src={cartLoaderImg} alt={cartLoaderImg} />
                <p>Loading...</p>
            </Modal>
        </div>
    )
};

export default Loader;