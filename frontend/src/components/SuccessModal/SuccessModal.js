import React, { useContext } from 'react';

import { FeedbackContext } from '../../store/feedbackContext';

import Card from '../UIElements/Card/Card';

import classes from './SuccessModal.module.css';

const SuccessModal = () => {

    const feedbackContext = useContext(FeedbackContext);


    if (feedbackContext.showSuccess) {

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
                        <button onClick={() => { feedbackContext.setShowSuccess(false, '') }}>Close</button>
                    </div>
                </Card>
            </div>
        )
    }
};

export default SuccessModal;