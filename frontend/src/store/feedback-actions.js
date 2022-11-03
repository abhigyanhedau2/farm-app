import { feedbackActions } from "./feedback-slice";

export const showError = (message) => {

    return (dispatch) => {

        const payload = {
            errorIsVisible: true,
            errorMessage: message
        };

        dispatch(feedbackActions.setErrorState(payload));

    };

};

export const hideError = () => {

    return (dispatch) => {

        const payload = {
            errorIsVisible: false,
            errorMessage: ''
        };

        dispatch(feedbackActions.setErrorState(payload));

    };

};

export const showSuccess = (message) => {

    return (dispatch) => {

        const payload = {
            successIsVisible: true,
            successMessage: message
        };

        dispatch(feedbackActions.setSuccessState(payload));

    };

};

export const hideSuccess = () => {

    return (dispatch) => {

        const payload = {
            successIsVisible: false,
            successMessage: ''
        };

        dispatch(feedbackActions.setSuccessState(payload));

    };

};