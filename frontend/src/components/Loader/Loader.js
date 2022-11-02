import React from 'react';

import loaderImg from '../../assets/loaderGif.gif';

import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div className={classes.overlay}>
            <img src={loaderImg} alt="Loader" />
        </div>
    );
};

export default Loader;