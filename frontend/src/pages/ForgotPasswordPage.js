import React, { useEffect } from 'react';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';

const ForgotPasswordPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Forgot Password`;
    }, []);

    return <ForgotPassword />;
};

export default ForgotPasswordPage;