import { useState } from "react";
import AddExpense from "./components/AddExpense/AddExpense";
import Dashboard from "./components/Dashboard/Dashboard";
import Nav from "./components/Nav/Nav";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import "./style/App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import User from "./components/Account/User/User";
import Family from "./components/Family/Family";

function App() {
  const auth = getAuth();
  const [window, setWindow] = useState(0);
  const [isSignIn, setIsSignIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  });

  return (
    <div className="App">
      {!isSignIn ? <Login /> : ""}

      {isSignIn && window == 0 ? <Dashboard /> : ""}
      {isSignIn && window == 2 ? <AddExpense /> : ""}
      {isSignIn && window == 3 ? <Family /> : ""}
      {isSignIn && window == 4 ? <User /> : ""}
      {isSignIn && window <= 5 ? (
        <Nav window={window} setWindow={setWindow} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
