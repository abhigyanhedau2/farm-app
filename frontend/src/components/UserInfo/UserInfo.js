import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { showError, showSuccess } from '../../store/feedback-actions';
import { showLoader, hideLoader } from '../../store/loader-actions';

import usePreInput from '../../hooks/use-pre-input';

import logoPic from '../../assets/logoPic.png';

import classes from './UserInfo.module.css';
import { useEffect } from 'react';

const textIsEmptyFn = (value) => {
    return value.trim().length !== 0;
}

const numberValidationFn = (value) => {
    return value.trim().length === 10;
};

const UserInfo = () => {

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { input: nameInput, inputIsValid: nameIsValid, inputIsTouched: nameIsTouched, inputChangeHandler: nameChangeHandler, inputTouchedHandler: nameTouchedHandler, setInput: setNameInput, setInputIsValid: setNameIsValid } = usePreInput(textIsEmptyFn);
    const { input: addressInput, inputIsValid: addressIsValid, inputIsTouched: addressIsTouched, inputChangeHandler: addressChangeHandler, inputTouchedHandler: addressTouchedHandler, setInput: setAddressInput, setInputIsValid: setAddressIsValid } = usePreInput(textIsEmptyFn);
    const { input: numberInput, inputIsValid: numberIsValid, inputIsTouched: numberIsTouched, inputChangeHandler: numberChangeHandler, inputTouchedHandler: numberTouchedHandler, setInput: setNumberInput, setInputIsValid: setNumberIsValid } = usePreInput(numberValidationFn);

    let nameClasses = undefined;
    let addressClasses = undefined;
    let numberClasses = undefined;

    if (nameIsTouched && nameIsValid)
        nameClasses = classes.inputCorrect;

    if (nameIsTouched && !nameIsValid)
        nameClasses = classes.error;

    if (addressIsTouched && addressIsValid)
        addressClasses = classes.inputCorrect;

    if (addressIsTouched && !addressIsValid)
        addressClasses = classes.error;

    if (numberIsTouched && numberIsValid)
        numberClasses = classes.inputCorrect;

    if (numberIsTouched && !numberIsValid)
        numberClasses = classes.error;

    useEffect(() => {

        const fetchUser = async () => {

            try {

                dispatch(showLoader());

                const response = await fetch(`https://farm-backend-production.up.railway.app/api/v1/users/getUser/${user._id}`);

                const data = await response.json();

                dispatch(hideLoader());

                if (data.status === 'success') {
                    setNameInput(data.data.user.name);
                    setNameIsValid(true);
                    setAddressInput(data.data.user.address);
                    setAddressIsValid(true);
                    setNumberInput(data.data.user.number);
                    setNumberIsValid(true);
                } else {
                    console.log('fail');
                }

            } catch (error) {

                dispatch(hideLoader());
                dispatch(showError(error.message));

            }

        };

        if (user)
            fetchUser();

    }, [user, setNameInput, setAddressInput, setNumberInput, setNameIsValid, setAddressIsValid, setNumberIsValid, dispatch]);

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        dispatch(showLoader());

        if (nameIsValid && addressIsValid && numberIsValid) {

            const name = nameInput;
            const address = addressInput;
            const number = numberInput;

            // Send update request
            try {

                const response = await fetch(`https://farm-backend-production.up.railway.app/api/v1/users`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name, address, number
                    })
                });

                const data = await response.json();

                dispatch(hideLoader());

                if (data.status === 'success') {
                    dispatch(showSuccess('User details updated successfully!'));
                    navigate('/');
                }

                else {
                    dispatch(showError(data.message));
                }

            } catch (error) {
                dispatch(hideLoader());
                dispatch(showError(error.message));
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
                    <button>Update Me</button>
                </form>
            </div>
        </div>
    )
};

export default UserInfo;