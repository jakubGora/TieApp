import React, { useEffect } from "react";
import "./style/User.css";
import {
  getAuth,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react/cjs/react.development";
import Message from "../../Message/Message";
import defUserImg from "../../../img/defUser.png";
function User() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [mailSendedMS, setMailSendedMS] = useState(false);

  const SendPassResetMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const SendEmailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {});
  };

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoUrl] = useState("");
  const [emailVerified, setEmailVerified] = useState();
  useEffect(() => {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      setdisplayName(user.displayName);
      setEmail(user.email);
      setPhotoUrl(user.photoURL);
      setEmailVerified(user.emailVerified);
      console.log(emailVerified);
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
  }, []);

  return (
    <div className="User">
      {mailSendedMS ? (
        <Message
          message={
            "Wiadomość z linkiem aktywacyjnym została wysłana ponownie na email: " +
            email
          }
          close={() => setMailSendedMS(false)}
        />
      ) : (
        ""
      )}
      <div className="top">
        <h1>Użytkownik</h1>
      </div>
      {emailVerified ? (
        ""
      ) : (
        <div className="email-ver">
          <p>
            Adres email jest nie zweryfikowany. <br /> Jeśli nie dostałeś
            wiadomości aktywacyjnej{" "}
            <button
              onClick={() => {
                SendEmailVerification();
                setMailSendedMS(true);
              }}
            >
              {" "}
              kliknij tutaj
            </button>
          </p>
        </div>
      )}
      <div className="user-info">
        <div>
          <h2>{displayName}</h2>
          <h3>{email}</h3>
          <img src={photoURL ? photoURL : defUserImg} alt="photo" />
        </div>
        <div>
          <button onClick={() => SendPassResetMail()}>Zmień hasło</button>
          <button onClick={() => SignOut()}>Wyloguj się</button>
        </div>
      </div>
    </div>
  );
}

export default User;
