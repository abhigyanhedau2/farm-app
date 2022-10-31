import { createContext, useState } from "react";

export const BackdropContext = createContext({
    show: false,
    setShowBackdrop: () => { }
});

const BackdropContextProvider = (props) => {
    const [showBackdrop, setShowBackdrop] = useState(false);

    const showBackdropHandler = (val) => {
        setShowBackdrop(val);
    };

    return (
        <BackdropContext.Provider value={{
            show: showBackdrop,
            setShowBackdrop: showBackdropHandler
        }} >{props.children}</BackdropContext.Provider>
    )
};

export default BackdropContextProvider;