import { configureStore } from "@reduxjs/toolkit";
import { userReducer, orderReducer, tripsReducer } from "./";

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    trips: tripsReducer,
  },
});
