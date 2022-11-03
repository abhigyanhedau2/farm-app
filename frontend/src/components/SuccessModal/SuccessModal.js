import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { hideSuccess } from '../../store/feedback-actions';

import Card from '../UIElements/Card/Card';

import classes from './SuccessModal.module.css';

const SuccessModal = () => {

    const dispatch = useDispatch();

    const successIsVisible = useSelector(state => state.feedback.successIsVisible);
    const successMessage = useSelector(state => state.feedback.successMessage);

    if (successIsVisible) {

        return (
            <div className={classes.overlay}>
                <Card className={classes.successModal}>
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
                </Card>
            </div>
        )
    }
};

export default SuccessModal;