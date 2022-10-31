import React, { useContext } from 'react';

import { BackdropContext } from '../../../store/backdropContext';

import './Backdrop.css';

const Backdrop = () => {

    const backdropContext = useContext(BackdropContext);

    if (backdropContext.show) {
        const body = document.getElementsByTagName("BODY")[0];;
        body.classList.add("lock-screen");
    } else {
        const body = document.getElementsByTagName("BODY")[0];;
        body.classList.remove("lock-screen");
    }

    return (
        // props.show && (<div className='backdrop'></div>)
        backdropContext.show && (<div className='backdrop'></div>)
    )
};

export default Backdrop;