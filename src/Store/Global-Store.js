import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { commentDataSlice } from "./commentDataSlice";
import { themeSwitchSlice } from "./themeSwitchSlice";

const rootReducer = combineReducers({
  comments: commentDataSlice.reducer,
  theme: themeSwitchSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
