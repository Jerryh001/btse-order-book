import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { api } from "./api/baseApi";

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
