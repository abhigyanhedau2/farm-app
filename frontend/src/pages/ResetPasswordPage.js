import React, { useEffect } from 'react';
import ResetPassword from '../components/ResetPassword/ResetPassword';

const ResetPasswordPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Reset Password`;
    }, []);

    return <ResetPassword />;
};

export default ResetPasswordPage;