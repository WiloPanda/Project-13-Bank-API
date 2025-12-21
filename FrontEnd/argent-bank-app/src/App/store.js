import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/App/Slices/authReducer';
import userReducer from '@/App/Slices/userReducer';

export const store = configureStore({
    reducer: {
        Auth: authReducer,
        User: userReducer
    },
});