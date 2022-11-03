import { createSlice } from "@reduxjs/toolkit";

const initialBackdropState = {
    backdropIsVisible: false
};

const backdropSlice = createSlice({
    name: 'loader',
    initialState: initialBackdropState,
    reducers: {
        setBackdropState(state, action) {
            state.backdropIsVisible = action.payload.backdropIsVisible;
        }
    }
});

export const backdropActions = backdropSlice.actions;

export default backdropSlice.reducer;