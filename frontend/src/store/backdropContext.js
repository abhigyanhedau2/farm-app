import { createContext, useState } from "react";

export const BackdropContext = createContext({
    showBackdrop: false,
    showBackdropHandler: () => { }
});

const BackdropContextProvider = (props) => {
    const [showBackdrop, setShowBackdrop] = useState(false);

    const showBackdropHandler = (val) => {
        setShowBackdrop(val);
    };

    return (
        <BackdropContext.Provider value={{
            showBackdrop,
            showBackdropHandler
        }} >{props.children}</BackdropContext.Provider>
    )
};

export default BackdropContextProvider;