import { backdropActions } from "./backdrop-slice";

export const showBackdrop = () => {

    return (dispatch) => {

        dispatch(backdropActions.setBackdropState({
            backdropIsVisible: true
        }));

    };

};

export const hideBackdrop = () => {

    return (dispatch) => {

        dispatch(backdropActions.setBackdropState({
            backdropIsVisible: false
        }));

    };

};