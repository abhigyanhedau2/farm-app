import { createSlice } from "@reduxjs/toolkit";

const initialProductsLoadingState = {
    isLoading: false
};

const productsLoadingSlice = createSlice({
    name: 'productsLoading',
    initialState: initialProductsLoadingState,
    reducers: {
        showProductsLoader(state, action) {
            state.isLoading = true;
        },
        hideProductsLoader(state, action) {
            state.isLoading = false;
        }
    }
})

export const productLoadingActions = productsLoadingSlice.actions;

export default productsLoadingSlice.reducer;