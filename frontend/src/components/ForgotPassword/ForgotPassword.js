import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { hideLoader, showLoader } from '../../store/loader-actions';

import useInput from '../../hooks/use-input';

import logoPic from '../../assets/logoPic.png';

import classes from './ForgotPassword.module.css';

const emailValidationFn = (value) => {

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regEmail.test(value)
};

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { input: emailInput, inputIsValid: emailIsValid, inputIsTouched: emailIsTouched, inputChangeHandler: emailChangeHandler, inputTouchedHandler: emailTouchedHandler } = useInput(emailValidationFn);

    let emailClasses = undefined;

    if (emailIsTouched && emailIsValid)
        emailClasses = classes.inputCorrect;

    if (emailIsTouched && !emailIsValid)
        emailClasses = classes.error;

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        dispatch(showLoader());

        if (emailIsValid) {

            const email = emailInput;

            try {
                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/forgotPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email
                    })
                });

                if (response.ok) {
                    dispatch(hideLoader());
                    dispatch(showSuccess('Verification token sent successfully. Please check your mail.'));
                    navigate('/resetPassword');
                } else {
                    dispatch(hideLoader());
                    dispatch(showError('Token sending failed. Try again later.'));
                }

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
            }

        }

    };

    return (
        <div className={classes.forgotPasswordPageWrapper}>
            <div className={classes.forgotPasswordCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.forgotPasswordForm} onSubmit={formSubmitHandler}>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="email">Enter your email signed in with us</label>
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
                    <button type='submit'>Get verification token</button>
                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;