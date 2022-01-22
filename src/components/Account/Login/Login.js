import { useState } from "react";
import loginImg from "../../../img/user.png";
import passImg from "../../../img/padlock.png";
import fbImg from "../../../img/facebook-social-logo.png";
import "./style/Login.css";

function Login({ window, setWindow }) {
  return (
    <div className="Login">
      <div className="head">
        <h1>Tie App</h1>{" "}
      </div>
      <form>
        <h1>Login</h1>
        <div className="container">
          <div className="input">
            <img src={loginImg} alt="a" />
            <input type="text" placeholder="Username" name="uname" required />
          </div>

          <div className="input">
            <img src={passImg} alt="a" />
            <input type="password" placeholder="Password" name="psw" required />
          </div>
          <div className="btns">
            <button
              onClick={(e) => {
                e.preventDefault();
                setWindow(0);
              }}
              type="submit"
            >
              Login
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWindow(6);
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div className="fb">
          <div className="fb-button">
            <img src={fbImg} alt="" />
            <p>Login with Facebook</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
