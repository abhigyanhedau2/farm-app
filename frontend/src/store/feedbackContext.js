import { createContext, useState } from "react";

export const FeedbackContext = createContext({
    showError: false,
    errorMessage: '',
    showSuccess: false,
    successMessage: '',
    setShowError: () => { },
    setShowSuccess: () => { }
});

const FeedbackContextProvider = (props) => {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const setShowErrorHandler = (showVal, message) => {
        setError(showVal);
        setErrorMessage(message);
    };
    const setShowSuccessHandler = (showVal, message) => {
        setSuccess(showVal);
        setSuccessMessage(message);
    };

    return (
        <FeedbackContext.Provider value={{
            showError: error,
            errorMessage: errorMessage,
            showSuccess: success,
            successMessage: successMessage,
            setShowError: setShowErrorHandler,
            setShowSuccess: setShowSuccessHandler
        }}>
            {props.children}
        </FeedbackContext.Provider>
    )
};

export default FeedbackContextProvider;