import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./firebase";
ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
