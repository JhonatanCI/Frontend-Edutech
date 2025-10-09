import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "./tagsSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
