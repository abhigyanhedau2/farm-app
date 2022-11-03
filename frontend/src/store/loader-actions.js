import { loaderActions } from "./loader-slice";

export const showLoader = () => {

    return (dispatch) => {

        dispatch(loaderActions.setLoaderState({
            loaderIsVisible: true
        }));

    };

};

export const hideLoader = () => {

    return (dispatch) => {

        dispatch(loaderActions.setLoaderState({
            loaderIsVisible: false
        }));

    };

};