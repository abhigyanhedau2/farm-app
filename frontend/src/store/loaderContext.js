import { createContext, useEffect, useState } from "react";

export const LoaderContext = createContext({
    loaderIsVisible: false,
    showLoader: () => { },
    hideLoader: () => { }
});

const LoaderContextProvider = (props) => {

    const [loader, setLoader] = useState(false);

    useEffect(() => {

        if (loader) {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.add("lock-screen");
        }

        else {
            const body = document.getElementsByTagName("BODY")[0];
            body.classList.remove("lock-screen");
        }

    }, [loader]);

    const showLoaderHandler = () => {
        setLoader(true);
    };

    const hideLoaderHandler = () => {
        setLoader(false);
    };

    return (
        <LoaderContext.Provider value={{
            loaderIsVisible: loader,
            showLoader: showLoaderHandler,
            hideLoader: hideLoaderHandler
        }}>
            {props.children}
        </LoaderContext.Provider>
    )

};

export default LoaderContextProvider;