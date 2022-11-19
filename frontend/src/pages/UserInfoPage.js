import React, { useEffect } from 'react';
import UserInfo from '../components/UserInfo/UserInfo';

const UserInfoPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Update Me`;
    }, []);

    return <UserInfo />;
};

export default UserInfoPage;