import { createSlice } from "@reduxjs/toolkit";

const initialLoaderState = {
    loaderIsVisible: false
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState: initialLoaderState,
    reducers: {
        setLoaderState(state, action) {
            state.loaderIsVisible = action.payload;
        }
    }
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice.reducer;