import { createSlice } from "@reduxjs/toolkit";

const initialLoaderState = {
    loaderIsVisible: false
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState: initialLoaderState,
    reducers: {
        setLoaderState(state, action) {
            if (action.payload) {
                const body = document.getElementsByTagName("BODY")[0];
                body.classList.add('lock-screen');
            }

            else {
                const body = document.getElementsByTagName("BODY")[0];
                body.classList.remove('lock-screen');
            }

            state.loaderIsVisible = action.payload;
        }
    }
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice.reducer;