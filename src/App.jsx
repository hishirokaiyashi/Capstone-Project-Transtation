import React, { useEffect } from "react";
import Router from "./routes";
import { useDispatch } from "react-redux";
import { initUser } from "./redux/user.slice";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, []);

  return (
    <div className="App">
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
