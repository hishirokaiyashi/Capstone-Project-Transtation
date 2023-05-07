import React, { useState, useEffect } from "react";
import Router from "./routes";
import { useDispatch } from "react-redux";
import { initUser } from "./redux/user.slice";
import { ToastContainer } from "react-toastify";
import ScrollBtn from "./components/Scroll";
import Loader from "./components/Loader";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = () => {
    setTimeout(() => setIsLoading(false), 800);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="App">
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <ScrollBtn />
    </div>
  );
}

export default App;
