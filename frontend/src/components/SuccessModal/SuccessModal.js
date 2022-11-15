import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { hideSuccess } from '../../store/feedback-actions';

import Modal from '../UIElements/Modal/Modal';

import classes from './SuccessModal.module.css';

const SuccessModal = () => {

    const dispatch = useDispatch();

    const successMessage = useSelector(state => state.feedback.successMessage);

    return (
        <div className={classes.overlay}>
            <Modal className={classes.successModal}>
                <div className={classes.successHeader}>
                    <i className="fa-solid fa-circle-check"></i>
                    <h1>Success!</h1>
                </div>
                <hr />
                <div className={classes.successBody}>
                    {successMessage}
                </div>
                <hr />
                <div className={classes.successFooter}>
                    <button onClick={() => { dispatch(hideSuccess()) }}>Close</button>
                </div>
            </Modal>
        </div>
    )
};

export default SuccessModal;