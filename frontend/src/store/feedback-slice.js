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
            state.errorIsVisible = action.payload.errorIsVisible;
            state.errorMessage = action.payload.errorMessage;
        },
        setSuccessState(state, action) {
            state.successIsVisible = action.payload.successIsVisible;
            state.successMessage = action.payload.successMessage;
        }
    }
});

export const feedbackActions = feedbackSlice.actions;

export default feedbackSlice.reducer;