import React, { useEffect } from 'react';

import classes from './Backdrop.module.css';

const Backdrop = () => {

    useEffect(() => {

        const body = document.getElementsByTagName("BODY")[0];
        body.classList.add('modal-open');

        return () => {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.remove('modal-open');
        };

    }, []);


    return (
        <div className={classes.overlay}></div>
    )
};

export default Backdrop;