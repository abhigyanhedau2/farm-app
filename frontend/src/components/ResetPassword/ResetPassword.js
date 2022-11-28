import React from 'react';

import { useDispatch } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import useInput from '../../hooks/use-input';

import logoPic from '../../assets/logoPic.png';
import classes from './ResetPassword.module.css';

const emailValidationFn = (value) => {

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regEmail.test(value)
};

const textIsEmptyFn = (value) => {
    return value.trim().length !== 0;
}

const passwordValidationFn = (value) => {
    return value.toString().trim().length >= 6;
}

const ResetPassword = () => {

    const dispatch = useDispatch();

    const { input: emailInput, inputIsValid: emailIsValid, inputIsTouched: emailIsTouched, inputChangeHandler: emailChangeHandler, inputTouchedHandler: emailTouchedHandler } = useInput(emailValidationFn);

    const { input: tokenInput, inputIsValid: tokenIsValid, inputIsTouched: tokenIsTouched, inputChangeHandler: tokenChangeHandler, inputTouchedHandler: tokenTouchedHandler } = useInput(textIsEmptyFn);
    const { input: passwordInput, inputIsValid: passwordIsValid, inputIsTouched: passwordIsTouched, inputChangeHandler: passwordChangeHandler, inputTouchedHandler: passwordTouchedHandler } = useInput(passwordValidationFn);

    let emailClasses = undefined;
    let tokenClasses = undefined;
    let passwordClasses = undefined;

    if (emailIsTouched && emailIsValid)
        emailClasses = classes.inputCorrect;

    if (emailIsTouched && !emailIsValid)
        emailClasses = classes.error;

    if (tokenIsTouched && tokenIsValid)
        tokenClasses = classes.inputCorrect;

    if (tokenIsTouched && !tokenIsValid)
        tokenClasses = classes.error;

    if (passwordIsTouched && passwordIsValid)
        passwordClasses = classes.inputCorrect;

    if (passwordIsTouched && !passwordIsValid)
        passwordClasses = classes.error;

    const formSubmitHandler = async (event) => {

        event.preventDefault();

        if (passwordIsValid && tokenIsValid && emailIsValid) {

            const token = tokenInput;
            const email = emailInput;
            const password = passwordInput;

            try {

                dispatch(showLoader());

                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/resetPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token, email, password
                    })
                });

                const data = await response.json();

                if (data.status === 'fail') {

                    dispatch(hideLoader());
                    dispatch(showError(data.message));

                }

                else {

                    dispatch(hideLoader());
                    dispatch(showSuccess('Password reset successful. You can now login with new password.'));

                }

            } catch (error) {

                dispatch(hideLoader());
                dispatch(showError(error.message));
                
            }

        }

    };

    return (
        <div className={classes.resetPasswordPageWrapper}>
            <div className={classes.resetPasswordCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.resetPasswordForm} onSubmit={formSubmitHandler}>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="verify">We've sent a verification token to your mail. Please enter the token below.</label>
                    </div>
                    <div className={classes.inputWrapper}>
                        <label htmlFor="name">Verification Token</label>
                        <input
                            className={tokenClasses}
                            type="text"
                            name="token"
                            id="token"
                            value={tokenInput}
                            onBlur={tokenTouchedHandler}
                            onChange={tokenChangeHandler}
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
                        <label htmlFor="password">Enter new password</label>
                        <input
                            className={passwordClasses}
                            type="password"
                            name="password"
                            id="password"
                            value={passwordInput}
                            onChange={passwordChangeHandler}
                            onBlur={passwordTouchedHandler}
                        />
                    </div>
                    <button>Verify</button>
                </form>
            </div>
        </div>
    )
};

export default ResetPassword;