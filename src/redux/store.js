import { configureStore } from "@reduxjs/toolkit";
import { userReducer, orderReducer } from "./";

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});
