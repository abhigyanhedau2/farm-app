import { createContext, useEffect, useState, useContext } from "react";
import jwt from 'jwt-decode';

import { FeedbackContext } from './feedbackContext';

export const LoginContext = createContext({
    isLoggedIn: false,
    token: undefined,
    user: {},
    onLogin: () => { },
    onLogout: () => { }
});

const LoginContextProvider = (props) => {

    const feedbackContext = useContext(FeedbackContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {

        const verifyToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {

                setToken(token);

                const user = await jwt(token);

                const userId = user.id;

                const response = await fetch(`https://birch-wood-farm.herokuapp.com/api/v1/users/getUser/${userId}`);

                const data = await response.json();

                if (data.status === 'fail')
                    feedbackContext.setShowError(true, data.message || 'Some error occured while loggin you in. Please log in again');

                // console.log(data.data.user);
                // setCurrentUser(data.data.user);
                setCurrentUser(data.data.user);

                // console.log(user.exp * 1000);
                // console.log(Date.now());

                if (user.exp * 1000 > Date.now())
                    setIsLoggedIn(true);
            }
        };

        verifyToken();

        //eslint-disable-next-line
    }, []);

    const loginHandler = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{
            isLoggedIn: isLoggedIn,
            token: token,
            user: currentUser,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </LoginContext.Provider>
    )

};

export default LoginContextProvider;