import { useEffect, useState } from "react";
import loginImg from "../../../img/user.png";
import passImg from "../../../img/padlock.png";
import fbImg from "../../../img/facebook-social-logo.png";
import "./style/Login.css";
import firebase, { fireAuth } from "../../../firebase";
import { getAuth } from "firebase/auth";

import StyleFirebaseUi from "react-firebaseui/StyledFirebaseAuth";
import logo from "../../../img/logoTieApp.png";
function Login({ window, setWindow }) {
  useEffect(() => {
    if (getAuth().currentUser) setWindow(4);
  }, [getAuth().currentUser]);

  useEffect(() => {
    console.log("asd");
  }, []);
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        setWindow(4);
        return true;
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",

    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.

      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,

        defaultCountry: "PL",
        whitelistedCountries: ["PL", "+48"],
      },
    ],
    // Terms of service url.
    tosUrl: "https://jakubgora.pl/tieappprivacy",
    // Privacy policy url.
    privacyPolicyUrl: "https://jakubgora.pl/tieappprivacy",
  };

  return (
    <div className="Login">
      <div className="head">
        <img src={logo} alt="logo" />
        <h1>Tie App</h1>
      </div>
      <h3>Kontroluj rodzinne wydatki</h3>
      <h2>Sign in</h2>
      <StyleFirebaseUi uiConfig={uiConfig} firebaseAuth={fireAuth} />
    </div>
  );
}

export default Login;
