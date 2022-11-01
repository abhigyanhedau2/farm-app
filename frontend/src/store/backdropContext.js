import { createContext, useState } from "react";

export const BackdropContext = createContext({
    showBackdrop: false,
    showBackdropWithLoader: false,
    showBackdropWithModal: false,
    showBackdropHandler: () => { },
    showBackdropWithLoaderHandler: () => { },
    showBackdropWithModalHandler: () => { }
});

const BackdropContextProvider = (props) => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showBackdropWithLoader, setShowBackdropWithLoader] = useState(false);
    const [showBackdropWithModal, setShowBackdropWithModal] = useState(false);

    const showBackdropHandler = (val) => {
        setShowBackdrop(val);
    };

    const showBackdropWithLoaderHandler = (val) => {
        setShowBackdropWithLoader(val);
    }

    const showBackdropWithModalHandler = (val) => {
        setShowBackdropWithModal(val);
    }

    return (
        <BackdropContext.Provider value={{
            showBackdrop,
            showBackdropWithLoader,
            showBackdropWithModal,
            showBackdropHandler,
            showBackdropWithLoaderHandler,
            showBackdropWithModalHandler
        }} >{props.children}</BackdropContext.Provider>
    )
};

export default BackdropContextProvider;