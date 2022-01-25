import { useState } from "react";
import AddExpense from "./components/AddExpense/AddExpense";
import Dashboard from "./components/Dashboard/Dashboard";
import History from "./components/History/History";
import Nav from "./components/Nav/Nav";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import "./style/App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import User from "./components/Account/User/User";
import Family from "./components/Family/Family";
import { useEffect } from "react/cjs/react.development";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Statistics from "./components/Statistics/Statistics";
function App() {
  const auth = getAuth();
  const [window, setWindow] = useState(0);
  const [isSignIn, setIsSignIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [fam, setFam] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    });

    if (user)
      onSnapshot(collection(db, "fam"), (snapshot) =>
        snapshot.docs.map((doc) => {
          if (doc.data().users.includes(user.email)) {
            setFam(doc.data().users);
          }
        })
      );

    setExpenses([]);
    if (user)
      onSnapshot(collection(db, "expenses"), (snapshot) =>
        snapshot.docs.map((doc) => {
          if (fam.includes(doc.data().email)) {
            setExpenses((expenses) => [
              ...expenses,
              {
                email: doc.data().email,
                category: doc.data().category,
                sum: doc.data().sum,
                time: doc.data().time,
              },
            ]);
          }
        })
      );
  }, [window]);

  return (
    <div className="App">
      {!isSignIn ? <Login /> : ""}

      {isSignIn && window == 0 ? (
        <Dashboard expenses={expenses} window={window} />
      ) : (
        ""
      )}
      {isSignIn && window == 1 ? (
        <Statistics fam={fam} expenses={expenses} />
      ) : (
        ""
      )}
      {isSignIn && window == 2 ? <AddExpense /> : ""}
      {isSignIn && window == 3 ? <History expenses={expenses} /> : ""}
      {isSignIn && window == 4 ? <User /> : ""}
      {isSignIn && window <= 5 ? (
        <Nav window={window} setWindow={setWindow} />
      ) : (
        ""
      )}
      {isSignIn && window == 8 ? <Family fam={fam} /> : ""}
    </div>
  );
}

export default App;
