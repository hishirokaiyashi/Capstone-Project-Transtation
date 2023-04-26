import { React, useLayoutEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Trips from "../pages/Trips";
import Test from "../pages/Test";
import ForgotPassword from "../pages/ForgotPassword";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Trips routes */}
          <Route
            path="/trips"
            element={
              // <PrivateRoute>
              <Trips />
              // </PrivateRoute>
            }
          />

          {/* Select tickets routes */}

          {/* Payment routes */}
          <Route
            path="/test"
            element={
              // <PrivateRoute>
              <Test />
              // </PrivateRoute>
            }
          />
          {/* Account information routes */}

          {/* Not found page */}
        </Routes>
      </Wrapper>
    </Router>
  );
}
