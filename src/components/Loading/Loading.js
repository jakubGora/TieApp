import { useState, useEffect } from "react";
import logo from "../../img/logoTieApp.png";
import "./style/Loading.css";
import { Offline, Online } from "react-detect-offline";
function Loading() {
  return (
    <div className="Loading">
      <img src={logo} alt="logo" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
