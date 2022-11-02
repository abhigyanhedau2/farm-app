import React, { useContext } from 'react';

import { BackdropContext } from '../../store/backdropContext';
import { FeedbackContext } from '../../store/feedbackContext';

import Card from '../UIElements/Card/Card';

import classes from './SuccessModal.module.css';

const SuccessModal = () => {

    const feedbackContext = useContext(FeedbackContext);
    const backdropContext = useContext(BackdropContext);

    backdropContext.showBackdropHandler(false);
    backdropContext.showBackdropWithLoaderHandler(false);

    const removeBodyClass = () => {
        const body = document.getElementsByTagName("BODY")[0];
        body.classList.remove("lock-screen");
    };

    if (feedbackContext.showSuccess) {

        const body = document.getElementsByTagName("BODY")[0];
        body.classList.add("lock-screen");

        return (
            <div className={classes.overlay}>
                <Card className={classes.successModal}>
                    <div className={classes.successHeader}>
                        <i className="fa-solid fa-circle-check"></i>
                        <h1>Success!</h1>
                    </div>
                    <hr />
                    <div className={classes.successBody}>
                        {feedbackContext.successMessage}
                    </div>
                    <hr />
                    <div className={classes.successFooter}>
                        <button onClick={() => { removeBodyClass(); feedbackContext.setShowSuccess(false, '') }}>Close</button>
                    </div>
                </Card>
            </div>
        )
    }
};

export default SuccessModal;