import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import loaderGif from '../../../assets/loaderGif.gif';
import classes from './BackdropWithLoader.module.css';

const BackdropWithLoader = (props) => {
    return (
        <Backdrop className={classes.backdropWithLoaderWrapper} show={props.show} alpha={props.alpha}>
            <img src={loaderGif} alt="Loader" />
        </Backdrop>
    )
};

export default BackdropWithLoader;