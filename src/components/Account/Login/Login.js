import { useState } from "react";
import loginImg from "../../../img/user.png";
import passImg from "../../../img/padlock.png";
import fbImg from "../../../img/facebook-social-logo.png";
import "./style/Login.css";
import firebase, { fireAuth } from "../../../firebase";
import StyleFirebaseUi from "react-firebaseui/StyledFirebaseAuth";

function Login({ window, setWindow }) {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        setWindow(0);
        return true;
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "<url-to-redirect-to-on-success>",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,

      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  return (
    <div className="Login">
      <div className="head">
        <h1>Tie App</h1>{" "}
      </div>
      <StyleFirebaseUi uiConfig={uiConfig} firebaseAuth={fireAuth} />
    </div>
  );
}

export default Login;
