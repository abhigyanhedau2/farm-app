import React, { useEffect } from 'react';

import Login from '../components/Login/Login';

const LoginPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Login`;
    }, []);

    return <Login />;
};

export default LoginPage;