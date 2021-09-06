import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./reset.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);
