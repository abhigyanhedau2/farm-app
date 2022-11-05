import { loaderActions } from "./loader-slice";

export const showLoader = () => {

    return async (dispatch) => {

        const body = document.getElementsByTagName("BODY")[0];
        body.classList.add('lock-screen');

        dispatch(loaderActions.setLoaderState(true));

    };

};

export const hideLoader = () => {

    return async (dispatch) => {

        const body = document.getElementsByTagName("BODY")[0];
        body.classList.remove('lock-screen');

        dispatch(loaderActions.setLoaderState(false));

    };

};