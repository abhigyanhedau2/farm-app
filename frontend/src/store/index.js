import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import feedbackReducer from './feedback-slice';
import loaderReducer from './loader-slice';
import backdropReducer from './backdrop-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        loader: loaderReducer,
        backdrop: backdropReducer
    }
});

export default store;