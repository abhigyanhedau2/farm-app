import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    products: [],
    totalItems: 0,
    cartPrice: 0,
    userId: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart(state, action) {
            state.products = action.payload.products;
            state.totalItems = action.payload.totalItems;
            state.cartPrice = action.payload.cartPrice;
            state.userId = action.payload.userId;
        },
        emptyCart(state, action) {
            state.products = [];
            state.totalItems = 0;
            state.cartPrice = 0;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;