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
  if (token) {
    try {
      dispatch(setLoading(true));
      const userDoc = await logInWithToken(JSON.parse(token));
      if (userDoc !== undefined) {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const createdAt = convertFromTimestamp(userData.createdAt);
          dispatch(setUser({ ...userData, createdAt }));
          dispatch(setLoading(false));
        }
      }
    } catch (error) {
      dispatch(logout);
      console.error(error);
    }
  }
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
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      // state = initialState;
      localStorage.removeItem("token");
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
