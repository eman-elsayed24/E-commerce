import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
