import { createContext, useState, useEffect } from "react";

export const BackdropContext = createContext({
    backdropIsVisible: false,
    showBackdrop: () => { },
    hideBackdrop: () => { }
});

const BackdropContextProvider = (props) => {

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {

        if (backdrop) {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.add("lock-screen");
        }

        else {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.remove("lock-screen");
        }

    }, [backdrop]);

    const showBackdropHandler = () => {
        setBackdrop(true);
    };

    const hideBackdropHandler = () => {
        setBackdrop(false);
    };

    return (
        <BackdropContext.Provider value={{
            backdropIsVisible: backdrop,
            showBackdrop: showBackdropHandler,
            hideBackdrop: hideBackdropHandler
        }}>
            {props.children}
        </BackdropContext.Provider>
    )

};

export default BackdropContextProvider;