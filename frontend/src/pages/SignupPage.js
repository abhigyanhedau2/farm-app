import React, { useEffect } from 'react';

import Signup from '../components/Signup/Signup';

const SignupPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Signup`;
    }, []);

    return <Signup />;
};

export default SignupPage;