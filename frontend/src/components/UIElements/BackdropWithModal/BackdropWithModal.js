import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import Card from '../Card/Card';
import classes from './BackdropWithLoader.module.css';

const BackdropWithModal = (props) => {

    const modalClasses = props.className;

    return (
        <Backdrop className={classes.backdropWithLoaderWrapper} show={props.show} alpha={props.alpha}>
            <Card className={modalClasses} />
        </Backdrop>
    )
};

export default BackdropWithModal;