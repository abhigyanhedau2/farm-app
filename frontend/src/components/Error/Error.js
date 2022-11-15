import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { hideError } from '../../store/feedback-actions';

import Modal from '../UIElements/Modal/Modal';

import classes from './Error.module.css';

const Error = () => {

    const errorMessage = useSelector(state => state.feedback.errorMessage);

    const dispatch = useDispatch();

    return (
        <Modal className={classes.errorModal}>
            <div className={classes.errorHeader}>
                <i className="fa-solid fa-circle-exclamation"></i>
                <h1>An Error Occured!</h1>
            </div>
            <hr />
            <div className={classes.errorBody}>
                {errorMessage}
            </div>
            <hr />
            <div className={classes.errorFooter}>
                <button onClick={() => { dispatch(hideError()) }}>Close</button>
            </div>
        </Modal>
    )
};

export default Error;