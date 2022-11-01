import { createContext, useState } from "react";

export const BackdropWithLoaderContext = createContext({
    show: false,
    setShowBackdrop: () => { }
});

const BackdropWithLoaderContextProvider = (props) => {
    const [showBackdropWithLoader, setShowBackdropWithLoader] = useState(false);

    const showBackdropWithLoaderHandler = (val) => {
        setShowBackdropWithLoader(val);
    };

    return (
        <BackdropWithLoaderContext.Provider value={{
            show: showBackdropWithLoader,
            setShowBackdrop: showBackdropWithLoaderHandler
        }} >{props.children}</BackdropWithLoaderContext.Provider>
    )
};

export default BackdropWithLoaderContextProvider;