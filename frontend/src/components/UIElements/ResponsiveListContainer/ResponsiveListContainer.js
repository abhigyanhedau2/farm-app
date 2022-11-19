import React from 'react';
import './ResponsiveListContainer.css';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const Backdrop = (props) => {
    return (
        <div className="backdrop" onClick={props.hideModalHandler}></div>
    )
}

const ModalOverlay = (props) => {

    const classes = props.className;

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

const Modal = (props) => {

    const portalDest = document.getElementById('overlays');

    const classes = props.className;

    useEffect(() => {

        const body = document.getElementsByTagName("BODY")[0];
        body.classList.add('modal-open');

        return () => {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.remove('modal-open');
        };

    }, []);

    return (
        <div>
            {ReactDOM.createPortal(<Backdrop hideModalHandler={props.hideModalHandler} />, portalDest)}
            {ReactDOM.createPortal(<ModalOverlay className={classes}>{props.children}</ModalOverlay>, portalDest)}
        </div>
    )
}

export default Modal;