import React, { useContext } from 'react';

import { BackdropContext } from '../../../store/backdropContext';

import './Backdrop.css';

const Backdrop = (props) => {

    const backdropContext = useContext(BackdropContext);

    if (backdropContext.show) {
        const body = document.getElementsByTagName("BODY")[0];;
        body.classList.add("lock-screen");
    } else {
        const body = document.getElementsByTagName("BODY")[0];;
        body.classList.remove("lock-screen");
    }

    const classes = 'backdrop ' + props.className;

    if (backdropContext.show || props.show) {
        return (
            // props.show && (<div className='backdrop'></div>)
            <div className={classes} style={{ background: `rgba(0, 0, 0, ${props.alpha || 0.75})` }}>{props.children}</div>
        )
    }
};

export default Backdrop;