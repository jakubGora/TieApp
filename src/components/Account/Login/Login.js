import { useEffect, useState } from "react";
import loginImg from "../../../img/user.png";
import passImg from "../../../img/padlock.png";
import fbImg from "../../../img/facebook-social-logo.png";
import "./style/Login.css";
import firebase, { fireAuth } from "../../../firebase";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

import StyleFirebaseUi from "react-firebaseui/StyledFirebaseAuth";
import logo from "../../../img/logoTieApp.png";
function Login({ window, setWindow }) {
  useEffect(() => {
    if (getAuth().currentUser) setWindow(0);
  });

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
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image", // 'audio'
          size: "compact", // 'invisible' or 'compact'
          badge: "bottomright", //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: "PL",
      },
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  return (
    <div className="Login">
      <div className="head">
        <img src={logo} alt="logo" />
        <h1>Tie App</h1>
      </div>
      <h2>Sign in</h2>{" "}
      <StyleFirebaseUi uiConfig={uiConfig} firebaseAuth={fireAuth} />
    </div>
  );
}

export default Login;
