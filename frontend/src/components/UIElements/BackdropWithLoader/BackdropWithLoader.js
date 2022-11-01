import React, { useContext } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import { BackdropWithLoaderContext } from '../../../store/backdropWithLoaderContext';

import loaderGif from '../../../assets/loaderGif.gif';
import classes from './BackdropWithLoader.module.css';

const BackdropWithLoader = (props) => {

    const backdropWithLoaderContext = useContext(BackdropWithLoaderContext);

    if (backdropWithLoaderContext.show) {
        const body = document.getElementsByTagName("BODY")[0];;
        body.classList.add("lock-screen");
    } else {
        const body = document.getElementsByTagName("BODY")[0];;
        body.classList.remove("lock-screen");
    }

    return (
        <Backdrop className={classes.backdrop + ' ' + classes.backdropWithLoaderWrapper} show={props.show} alpha={props.alpha}>
            <img src={loaderGif} alt="Loader" />
        </Backdrop>
    )

};

export default BackdropWithLoader;