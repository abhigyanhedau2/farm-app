import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LoginContext } from '../../store/authContext';
import { FeedbackContext } from '../../store/feedbackContext';
import { LoaderContext } from '../../store/loaderContext';

import useInput from '../../hooks/use-input';

import logoPic from '../../assets/logoPic.png';
import classes from './Login.module.css';

const emailValidationFn = (value) => {

    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regEmail.test(value)
};

const passwordValidationFn = (value) => {
    return value.toString().trim().length >= 6;
}

const Login = () => {

    const loginContext = useContext(LoginContext);
    const feedbackContext = useContext(FeedbackContext);
    const loaderContext = useContext(LoaderContext);

    const navigate = useNavigate();

    const { input: emailInput, inputIsValid: emailIsValid, inputIsTouched: emailIsTouched, inputChangeHandler: emailChangeHandler, inputTouchedHandler: emailTouchedHandler } = useInput(emailValidationFn);
    const { input: passwordInput, inputIsValid: passwordIsValid, inputIsTouched: passwordIsTouched, inputChangeHandler: passwordChangeHandler, inputTouchedHandler: passwordTouchedHandler } = useInput(passwordValidationFn);

    let emailClasses = undefined;
    let passwordClasses = undefined;

    if (emailIsTouched && emailIsValid)
        emailClasses = classes.inputCorrect;

    if (emailIsTouched && !emailIsValid)
        emailClasses = classes.error;

    if (passwordIsTouched && passwordIsValid)
        passwordClasses = classes.inputCorrect;

    if (passwordIsTouched && !passwordIsValid)
        passwordClasses = classes.error;

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        loaderContext.showLoader();

        if (emailIsValid && passwordIsValid) {

            const email = emailInput;
            const password = passwordInput;

            try {

                const response = await fetch('https://birch-wood-farm.herokuapp.com/api/v1/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, password
                    })
                });

                const data = await response.json();

                if (data.status === 'fail')
                    feedbackContext.setShowError(true, data.message);

                loginContext.onLogin(data.data.token);
                loaderContext.hideLoader();

                navigate('/');

            } catch (error) {
                loaderContext.hideLoader();
                feedbackContext.setShowError(true, error.message);
            }

        }

    };

    return (
        <div className={classes.loginPageWrapper}>
            <div className={classes.loginCardWrapper}>
                <div className={classes.logoWrapper}>
                    <img src={logoPic} alt="Logo" />
                </div>
                <h1>Birch Wood Ranch</h1>
                <form className={classes.loginForm} onSubmit={formSubmitHandler}>
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
                        <label htmlFor="password">Password</label>
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
                    <button>Login</button>
                </form>
                <div className={classes.extraInfo}>
                    <p>Forgot Password? <span><Link to="/forgotPassword">Click Here</Link></span></p>
                    <p>New to Birch Wood Ranch? <span><Link to="/signup">Signup</Link></span></p>
                </div>
            </div>
        </div>
    )
};

export default Login;