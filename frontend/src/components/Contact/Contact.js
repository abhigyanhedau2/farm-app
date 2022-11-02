import React, { useContext } from 'react';

import useInput from '../../hooks/use-input';
import { FeedbackContext } from '../../store/feedbackContext';

import logoPic from '../../assets/logoPic.png';
import classes from './Contact.module.css';

const emailValidationFn = (value) => {

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regEmail.test(value)
};

const textIsEmptyFn = (value) => {
    return value.trim().length !== 0;
}

const Contact = () => {

    const feedbackContext = useContext(FeedbackContext);

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler } = useInput(textIsEmptyFn);
    const { input: emailInput, inputIsValid: emailIsValid, inputIsTouched: emailIsTouched, inputChangeHandler: emailChangeHandler, inputTouchedHandler: emailTouchedHandler } = useInput(emailValidationFn);
    const { input: queryInput, inputIsValid: queryIsValid, inputIsTouched: queryIsTouched, inputChangeHandler: queryChangeHandler, inputTouchedHandler: queryTouchedHandler } = useInput(textIsEmptyFn);

    let nameClasses = undefined;
    let emailClasses = undefined;
    let queryClasses = undefined;

    if (nameIsTouched && nameIsValid)
        nameClasses = classes.inputCorrect;

    if (nameIsTouched && !nameIsValid)
        nameClasses = classes.error;

    if (emailIsTouched && emailIsValid)
        emailClasses = classes.inputCorrect;

    if (emailIsTouched && !emailIsValid)
        emailClasses = classes.error;

    if (queryIsTouched && queryIsValid)
        queryClasses = classes.inputCorrect;

    if (queryIsTouched && !queryIsValid)
        queryClasses = classes.error;


    const formSubmitHandler = async (event) => {
        event.preventDefault();

        const name = nameInput;
        const email = emailInput;
        const query = queryInput;

        try {

            const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/queries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, query
                })
            })

            if (response.ok) {
                feedbackContext.setShowSuccess(true, "Query sent successfully. We'll get back to you at the earliest.");
            } else {
                feedbackContext.setShowError(true, 'Query sending failed. Try again later.');
            }

        } catch (error) {
            feedbackContext.setShowError(true, error.message);
        }
    };

    return (
        <div className={classes.contactPageWrapper}>
            <div className={classes.contactCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.contactForm} onSubmit={formSubmitHandler}>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="name">Name</label>
                        <input
                            className={nameClasses}
                            type="text"
                            name="name"
                            id="name"
                            value={nameInput}
                            onBlur={nameTouchedHandler}
                            onChange={nameChangeHandler}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="email">EMail</label>
                        <input
                            className={emailClasses}
                            type="email"
                            name="email"
                            id="email"
                            value={emailInput}
                            onChange={emailChangeHandler}
                            onBlur={emailTouchedHandler}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="query">Query</label>
                        <textarea
                            className={queryClasses}
                            type="text"
                            name="query"
                            id="query"
                            value={queryInput}
                            onChange={queryChangeHandler}
                            onBlur={queryTouchedHandler}
                            rows="5"
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
};

export default Contact;