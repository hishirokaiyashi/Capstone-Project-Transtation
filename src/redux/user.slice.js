import { createSlice } from "@reduxjs/toolkit";
import { logInWithToken } from "../firebase/auth.js";

import { convertFromTimestamp } from "../utils/convertDatetime.js";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  error: null,
  user: {
    uid: null,
    userName: null,
    admin: false,
    fullName: "",
    avatar: "",
    address: "",
    age: "",
    createdAt: "",
    email: "",
    gender: "",
    phoneNumber: "",
    authProvider: "",
  },
  token: null,
};

export const initUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token) {
    try {
      dispatch(setLoading(true));
      // const userDoc = await logInWithToken(JSON.parse(token));
      // if (userDoc !== undefined) {
      //   if (userDoc.exists()) {
      //     const userData = userDoc.data();
      //     const createdAt = convertFromTimestamp(userData.createdAt);
      //     dispatch(setUser({ ...userData, createdAt }));
      //     dispatch(setLoading(false));
      //   }
      // }

      const userData = JSON.parse(user);
      dispatch(setUser({ ...userData }));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(logout);
      console.error(error);
    }
  }
  dispatch(setLoading(false));
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, setLoading, setError, setToken, logout } =
  userSlice.actions;
export default userSlice.reducer;
