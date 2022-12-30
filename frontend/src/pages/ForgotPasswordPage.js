import React, { useEffect } from 'react';
// import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import RecoverAccount from '../components/RecoverAccount/RecoverAccount';

const ForgotPasswordPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Forgot Password`;
    }, []);

    return <RecoverAccount />;
};

export default ForgotPasswordPage;