import React, { useState } from 'react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';
import { login } from '../../store/auth-actions';

import useInput from '../../hooks/use-input';

import logoPic from '../../assets/logoPic.png';

import classes from './RecoverAccount.module.css';

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

const RecoverAccount = () => {

    const [tokenSent, setTokenSent] = useState(false);

    const navigate = useNavigate();

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

    const sendTokenHandler = async (event) => {
        event.preventDefault();

        if (emailIsValid) {

            const email = emailInput;
            const hash = uuid();

            try {

                dispatch(showLoader());

                const response = await fetch('https://birch-wood-ranch-backend.vercel.app/api/v1/users/forgotPassword', {
                // const response = await fetch('http://localhost:5000/api/v1/users/forgotPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, hash
                    })
                });

                await fetch('https://birch-wood-ranch-backend.vercel.app/api/v1/users/forgotPassword', {
                // await fetch('http://localhost:5000/api/v1/users/forgotPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, hash
                    })
                });

                if (response.ok) {

                    dispatch(hideLoader());
                    dispatch(showSuccess('Verification token sent successfully. Please check your mail.'));
                    setTokenSent(true);

                } else {

                    dispatch(hideLoader());
                    dispatch(showError('Token sending failed. Try again later.'));

                }

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
            }

            dispatch(hideLoader());

        }

    };

    const verifyTokenHandler = async (event) => {

        event.preventDefault();

        if (passwordIsValid && tokenIsValid && emailIsValid) {

            const token = tokenInput;
            const email = emailInput;
            const password = passwordInput;

            try {

                dispatch(showLoader());

                const response = await fetch('https://birch-wood-ranch-backend.vercel.app/api/v1/users/resetPassword', {
                // const response = await fetch('http://localhost:5000/api/v1/users/resetPassword', {
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

                    try {

                        dispatch(showLoader());
                        
                        dispatch(login(data.data.token));
                        dispatch(hideLoader());
                        navigate('/');

                    } catch (error) {
                        dispatch(hideLoader());
                        dispatch(showError(error.message));
                    }

                    dispatch(hideLoader());


                }

            } catch (error) {

                dispatch(hideLoader());
                dispatch(showError(error.message, "or valid email"));

            }

        }

    };

    const dummyFormSubmitHandler = (event) => event.preventDefault();

    return (
        <div className={classes.resetPasswordPageWrapper}>
            <div className={classes.resetPasswordCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.resetPasswordForm} onSubmit={dummyFormSubmitHandler}>
                    {tokenSent && <div className={classes.inputWrapper}>
                        <label htmlFor="verify">We've sent a verification token to your mail. Please enter the token below.</label>
                    </div>}
                    {tokenSent && <div className={classes.inputWrapper}>
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
                    </div>}
                    <div className={classes.inputWrapper}>
                        {!tokenSent && <label htmlFor="email">Enter the EMail registered with us</label>}
                        {tokenSent && <label htmlFor="email">EMail</label>}
                        <input
                            className={emailClasses}
                            type="email"
                            name="email"
                            id="email"
                            value={emailInput}
                            onChange={emailChangeHandler}
                            onBlur={emailTouchedHandler}
                            disabled={tokenSent}
                        />
                    </div>
                    {tokenSent && <div className={classes.inputWrapper}>
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
                    </div>}
                    {!tokenSent && <button onClick={sendTokenHandler}>Send Token</button>}
                    {tokenSent && <button onClick={verifyTokenHandler}>Change Password</button>}
                </form>
            </div>
        </div>
    )
};

export default RecoverAccount;