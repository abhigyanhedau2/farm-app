import { createSlice } from "@reduxjs/toolkit";

const initialFeedbackState = {
    errorIsVisible: false,
    errorMessage: '',
    successIsVisible: false,
    successMessage: ''
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: initialFeedbackState,
    reducers: {
        setErrorState(state, action) {

            if (action.payload.errorIsVisible) {
                const body = document.getElementsByTagName("BODY")[0];
                body.classList.add('lock-screen');
            }

            else {
                const body = document.getElementsByTagName("BODY")[0];
                body.classList.remove('lock-screen');
            }

            state.errorIsVisible = action.payload.errorIsVisible;
            state.errorMessage = action.payload.errorMessage;
        },
        setSuccessState(state, action) {

            if (action.payload.successIsVisible) {
                const body = document.getElementsByTagName("BODY")[0];
                body.classList.add('lock-screen');
            }

            else {
                const body = document.getElementsByTagName("BODY")[0];
                body.classList.remove('lock-screen');
            }

            state.successIsVisible = action.payload.successIsVisible;
            state.successMessage = action.payload.successMessage;
        }
    }
});

export const feedbackActions = feedbackSlice.actions;

export default feedbackSlice.reducer;