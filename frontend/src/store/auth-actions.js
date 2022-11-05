import { authActions } from "./auth-slice";
import { showError } from './feedback-actions';
import { showLoader, hideLoader } from './loader-actions';
import jwt from 'jwt-decode';

export const fetchToken = () => {

    showLoader();

    return async (dispatch) => {

        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Prepare the initial payload
        let payload = {
            isLoggedIn: false,
            token: null,
            user: null
        };

        // If token is present, set the payload token, user and login state
        if (token) {

            payload.token = token;

            try {

                // Get the user from token
                const user = await jwt(token);

                // Get the user id from user
                const userId = user.id;

                // Fetch the user from user id
                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/users/getUser/${userId}`);

                const data = await response.json();

                if (data.status === 'fail') {
                    showError(data.message);
                    return;
                }

                // Set the user
                payload.user = data.data.user;

                // Check if token is still valid
                if (user.exp * 1000 > Date.now())
                    payload.isLoggedIn = true;


            } catch (error) {
                showError(error.message);
            }

        }

        // Dispatch login action
        hideLoader();
        dispatch(authActions.login(payload));

    };

};

export const login = (token) => {

    showLoader();

    return async (dispatch) => {

        let payload = {
            isLoggedIn: true,
            token: token,
            user: null
        }

        try {

            // Check if the token is valid
            const user = await jwt(token);

            // Get user from the token
            const userId = user.id;

            // Fetch the user from user id
            const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/users/getUser/${userId}`);

            const data = await response.json();

            if (data.status === 'fail') {
                showError(data.message);
                return;
            }

            // Set the user
            payload.user = data.data.user;

            // Check the token is still valid
            if (user.exp * 1000 > Date.now()) {
                payload.isLoggedIn = true;
                localStorage.setItem('token', token);
            }

        } catch (error) {
            showError(error.message);
        }

        hideLoader();
        dispatch(authActions.login(payload));

    };

};

export const logout = () => {

    return (dispatch) => {

        localStorage.removeItem('token');
        dispatch(authActions.logout());

    };

};