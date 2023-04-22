import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
