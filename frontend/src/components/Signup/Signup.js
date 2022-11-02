import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FeedbackContext } from '../../store/feedbackContext';

import logoPic from '../../assets/logoPic.png';
import useInput from '../../hooks/use-input';
import classes from './Signup.module.css';

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

    const feedbackContext = useContext(FeedbackContext);

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler } = useInput(textIsEmptyFn);
    const { input: emailInput, inputIsValid: emailIsValid, inputIsTouched: emailIsTouched, inputChangeHandler: emailChangeHandler, inputTouchedHandler: emailTouchedHandler } = useInput(emailValidationFn);
    const { input: passwordInput, inputIsValid: passwordIsValid, inputIsTouched: passwordIsTouched, inputChangeHandler: passwordChangeHandler, inputTouchedHandler: passwordTouchedHandler } = useInput(passwordValidationFn);
    const { input: addressInput, inputIsValid: addressIsValid, inputIsTouched: addressIsTouched, inputChangeHandler: addressChangeHandler, inputTouchedHandler: addressTouchedHandler } = useInput(textIsEmptyFn);
    const { input: numberInput, inputIsValid: numberIsValid, inputIsTouched: numberIsTouched, inputChangeHandler: numberChangeHandler, inputTouchedHandler: numberTouchedHandler } = useInput(numberValidatioFn);

    let nameClasses = undefined;
    let emailClasses = undefined;
    let passwordClasses = undefined;
    let addressClasses = undefined;
    let numberClasses = undefined;

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

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        if (nameIsValid && emailIsValid && passwordIsValid && addressIsValid && numberIsValid) {

            const name = nameInput;
            const email = emailInput;
            const password = passwordInput;
            const address = addressInput;
            const number = numberInput;

            try {

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

                if (data.status === 'fail')
                    feedbackContext.setShowError(true, data.message);

                console.log(data);

            } catch (error) {
                feedbackContext.setShowError(true, error.message);
            }

        }

    };

    return (
        <div className={classes.signupPageWrapper}>
            <div className={classes.signupCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.signupForm} onSubmit={formSubmitHandler}>
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
                            onBlur={emailTouchedHandler}
                            onChange={emailChangeHandler}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
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
                    </div>
                    <div className={classes.inputWrapper}>
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
                    </div>
                    <div className={classes.inputWrapper}>
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
                    </div>
                    <button>Sign Up</button>
                </form>
                <div className={classes.extraInfo}>
                    <p>Already have an account? <span><Link to="/login">Login</Link></span></p>
                </div>
            </div>
        </div>
    )
};

export default Signup;