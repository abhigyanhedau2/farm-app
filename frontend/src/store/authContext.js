import { createContext, useEffect, useState } from "react";
import jwt from 'jwt-decode';

export const LoginContext = createContext({
    isLoggedIn: false,
    onLogin: () => { },
    onLogout: () => { }
});

const LoginContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const verifyToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const user = await jwt(token);

                // console.log(user.exp * 1000);
                // console.log(Date.now());

                if (user.exp * 1000 > Date.now())
                    setIsLoggedIn(true);
            }
        };

        verifyToken();

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
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </LoginContext.Provider>
    )

};

export default LoginContextProvider;