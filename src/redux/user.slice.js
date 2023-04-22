import { createSlice } from "@reduxjs/toolkit";
import { logInWithToken } from "../firebase/auth.js";

import { toast } from "react-toastify";

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
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setUser(userData));
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.info("Bạn đã đăng xuất khỏi tầm mắt tui!");
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
      console.log("Đăng xuất")
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
