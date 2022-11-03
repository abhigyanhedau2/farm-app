import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn: false,
    token: null,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.token = null;
            state.user = null;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;