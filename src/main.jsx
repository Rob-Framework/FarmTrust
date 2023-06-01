import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import storage from "./storage";
import 'bootstrap/dist/css/bootstrap.css';

new storage();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
