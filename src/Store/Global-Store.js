import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { commentDataSlice } from './commentDataSlice';


const rootReducer = combineReducers({
    comments: commentDataSlice.reducer,
})
export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})