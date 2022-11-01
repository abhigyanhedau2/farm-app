import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    onLogin: () => { },
    onLogout: () => { }
});

const LoginContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('token'))
            setIsLoggedIn(true);

    }, []);

    const loginHandler = (token) => {
        localStorage.setItem('token', token);
        console.log(token);
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