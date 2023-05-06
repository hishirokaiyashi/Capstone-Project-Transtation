import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "react-datepicker/dist/react-datepicker.css";
import "react-alice-carousel/lib/alice-carousel.css";

import AOS from "aos";

import "aos/dist/aos.css";
import "./assets/styles/index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
