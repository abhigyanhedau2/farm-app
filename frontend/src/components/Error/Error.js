import React, { useContext } from 'react';

import { FeedbackContext } from '../../store/feedbackContext';

import Card from '../UIElements/Card/Card';

import classes from './Error.module.css';

const Error = () => {

    const feedbackContext = useContext(FeedbackContext);

    if (feedbackContext.showError) {

        return (
            <div className={classes.overlay}>
                <Card className={classes.errorModal}>
                    <div className={classes.errorHeader}>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <h1>An Error Occured!</h1>
                    </div>
                    <hr />
                    <div className={classes.errorBody}>
                        {feedbackContext.errorMessage}
                    </div>
                    <hr />
                    <div className={classes.errorFooter}>
                        <button onClick={() => { feedbackContext.setShowError(false, '') }}>Close</button>
                    </div>
                </Card>
            </div>
        )
    }
};

export default Error;