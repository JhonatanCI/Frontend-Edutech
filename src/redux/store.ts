import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './tagsSlice';

export const store = configureStore({
    reducer: {
        tags: tagsReducer,
    },
});