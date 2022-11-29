import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { login } from '../../store/auth-actions';
import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import useInput from '../../hooks/use-input';
import usePreInput from '../../hooks/use-pre-input';

import logoPic from '../../assets/logoPic.png';
import classes from './Signup.module.css';
import { useState } from 'react';

const emailValidationFn = (value) => {

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regEmail.test(value)
};

const passwordValidationFn = (value) => {
    return value.toString().trim().length >= 6;
};

const textIsEmptyFn = (value) => {
    return value.trim().length !== 0;
}

const numberValidatioFn = (value) => {
    return value.trim().length === 10;
};

const Signup = () => {

    const navigate = useNavigate();

    const [tokenSent, setTokenSent] = useState(false);
    const [enteredTokenIsValid, setEnteredTokenIsValid] = useState(false);

    const dispatch = useDispatch();

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler } = useInput(textIsEmptyFn);
    const { input: emailInput, inputIsValid: emailIsValid, inputIsTouched: emailIsTouched, inputChangeHandler: emailChangeHandler, inputTouchedHandler: emailTouchedHandler } = usePreInput(emailValidationFn);
    const { input: passwordInput, inputIsValid: passwordIsValid, inputIsTouched: passwordIsTouched, inputChangeHandler: passwordChangeHandler, inputTouchedHandler: passwordTouchedHandler } = useInput(passwordValidationFn);
    const { input: addressInput, inputIsValid: addressIsValid, inputIsTouched: addressIsTouched, inputChangeHandler: addressChangeHandler, inputTouchedHandler: addressTouchedHandler } = useInput(textIsEmptyFn);
    const { input: numberInput, inputIsValid: numberIsValid, inputIsTouched: numberIsTouched, inputChangeHandler: numberChangeHandler, inputTouchedHandler: numberTouchedHandler } = useInput(numberValidatioFn);
    const { input: tokenInput, inputIsValid: tokenIsValid, inputIsTouched: tokenIsTouched, inputChangeHandler: tokenChangeHandler, inputTouchedHandler: tokenTouchedHandler } = useInput(textIsEmptyFn);

    let nameClasses = undefined;
    let emailClasses = undefined;
    let passwordClasses = undefined;
    let addressClasses = undefined;
    let numberClasses = undefined;
    let tokenClasses = undefined;

    if (nameIsTouched && nameIsValid)
        nameClasses = classes.inputCorrect;

    if (nameIsTouched && !nameIsValid)
        nameClasses = classes.error;

    if (emailIsTouched && emailIsValid)
        emailClasses = classes.inputCorrect;

    if (emailIsTouched && !emailIsValid)
        emailClasses = classes.error;

    if (passwordIsTouched && passwordIsValid)
        passwordClasses = classes.inputCorrect;

    if (passwordIsTouched && !passwordIsValid)
        passwordClasses = classes.error;

    if (addressIsTouched && addressIsValid)
        addressClasses = classes.inputCorrect;

    if (addressIsTouched && !addressIsValid)
        addressClasses = classes.error;

    if (numberIsTouched && numberIsValid)
        numberClasses = classes.inputCorrect;

    if (numberIsTouched && !numberIsValid)
        numberClasses = classes.error;

    if (tokenIsTouched && tokenIsValid)
        tokenClasses = classes.inputCorrect;

    if (tokenIsTouched && !tokenIsValid)
        tokenClasses = classes.error;

    const sendTokenHandler = async () => {

        if (emailIsValid) {
            dispatch(showLoader());

            const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/sendToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput
                })
            });

            const data = await response.json();

            dispatch(hideLoader());

            if (data.status === 'success') {
                setTokenSent(true);
                dispatch(showSuccess('A verification token has been sent to your email. Copy and paste the verification token here to complete the verification process.'));
            } else {
                dispatch(showError(data.message));
            }
        }

        else {
            emailClasses = classes.error;
        }

    };

    const verifyTokenHandler = async () => {

        if (tokenIsValid) {

            dispatch(showLoader());

            const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput,
                    token: tokenInput
                })
            });

            const data = await response.json();

            dispatch(hideLoader());

            if (data.status === 'success') {
                setEnteredTokenIsValid(true);
            } else {
                dispatch(showError(data.message));
            }

        }
    };

    const formSubmitHandler = async () => {

        if (nameIsValid && emailIsValid && passwordIsValid && addressIsValid && numberIsValid && enteredTokenIsValid) {

            const name = nameInput;
            const email = emailInput;
            const password = passwordInput;
            const address = addressInput;
            const number = numberInput;

            try {

                dispatch(showLoader());

                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name, email, password, address, number
                    })
                });

                const data = await response.json();

                if (data.status === 'fail') {
                    dispatch(hideLoader());
                    dispatch(showError(data.message));
                }

                else {
                    dispatch(hideLoader());
                    dispatch(login(data.data.token));
                    navigate('/');
                }

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
            }

        }

    };

    const formSubmitHandlerDUMMY = (event) => { event.preventDefault(); };

    return (
        <div className={classes.signupPageWrapper}>
            <div className={classes.signupCardWrapper}>
                <button className={classes.backBtn} onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long"></i></button>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.signupForm} onSubmit={formSubmitHandlerDUMMY}>
                    {enteredTokenIsValid && <div className={classes.inputWrapper}>
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
                    </div>}
                    <div className={classes.inputWrapper}>
                        <label htmlFor="email">EMail</label>
                        <input
                            className={emailClasses}
                            type="email"
                            name="email"
                            id="email"
                            value={emailInput}
                            onBlur={emailTouchedHandler}
                            onChange={emailChangeHandler}
                            disabled={tokenSent}
                        />
                    </div>
                    {tokenSent && !enteredTokenIsValid && <div className={classes.inputWrapper}>
                        <label htmlFor="token">Enter token</label>
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
                    {enteredTokenIsValid && <div className={classes.inputWrapper}>
                        <label htmlFor="password">Password</label>
                        <input
                            className={passwordClasses}
                            type="password"
                            name="password"
                            id="password"
                            value={passwordInput}
                            onBlur={passwordTouchedHandler}
                            onChange={passwordChangeHandler}
                        />
                    </div>}
                    {enteredTokenIsValid && <div className={classes.inputWrapper}>
                        <label htmlFor="address">Address</label>
                        <input
                            className={addressClasses}
                            type="text"
                            name="name"
                            id="name"
                            value={addressInput}
                            onBlur={addressTouchedHandler}
                            onChange={addressChangeHandler}
                        />
                    </div>}
                    {enteredTokenIsValid && <div className={classes.inputWrapper}>
                        <label htmlFor="number">Mobile Number</label>
                        <input
                            className={numberClasses}
                            type="number"
                            name="number"
                            id="number"
                            value={numberInput}
                            onBlur={numberTouchedHandler}
                            onChange={numberChangeHandler}
                        />
                    </div>}
                    {!tokenSent && !enteredTokenIsValid && <button onClick={sendTokenHandler}>Send Verification Token</button>}
                    {tokenSent && !enteredTokenIsValid && <button onClick={verifyTokenHandler}>Verify Token</button>}
                    {tokenSent && enteredTokenIsValid && <button onClick={formSubmitHandler}>Sign Up</button>}
                </form>
                <div className={classes.extraInfo}>
                    <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
                </div>
            </div>
        </div>
    )
};

export default Signup;