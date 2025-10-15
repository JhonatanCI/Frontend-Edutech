import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "./tagsSlice";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
