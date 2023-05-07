import { React, useLayoutEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Trips from "../pages/Trips";
import Test from "../pages/Test";
import ForgotPassword from "../pages/ForgotPassword";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Notfound from "../pages/Notfound";
import Payment from "../pages/Payment";

import Profile from "../pages/Profile";
import CheckoutGiao from "../pages/Checkout-Giao";

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
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Trips routes */}
          <Route
            path="/trips"
            element={
              <PrivateRoute>
                <Trips itemsPerPage={2} />
              </PrivateRoute>
            }
          />

          {/* Payment routes */}
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/test-2"
            element={
              <PrivateRoute>
                <CheckoutGiao />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-account"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/checkout-success"
            element={
              <PrivateRoute>
                <CheckoutSuccess />/
              </PrivateRoute>
            }
          />

          {/* Account information routes */}

          {/* Not found page */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}
