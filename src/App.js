import { useState, useEffect } from "react";
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
import { Offline, Online } from "react-detect-offline";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import Statistics from "./components/Statistics/Statistics";
import Loading from "./components/Loading/Loading";
function App() {
  const auth = getAuth();
  const [window, setWindow] = useState(0);
  const [isSignIn, setIsSignIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [fam, setFam] = useState([]);
  const [famId, setFamId] = useState();
  const user = getAuth().currentUser;
  const [months, setMonths] = useState([]);
  const [firstLogin, setFirtLogin] = useState(true);

  const addUser = async () => {
    addDoc(
      collection(db, "user"),
      {
        email: user.email,
        famId: null,
        photoUrl: user.photoURL,
        name: user.displayName
          ? user.displayName
          : user.email.substring(0, user.email.indexOf("@")),
      },
      user.uid
    );
  };

  useEffect(
    () =>
      onSnapshot(collection(db, "user"), (snapshot) => {
        if (user)
          if (!snapshot.docs.some((e) => e.data().email === user.email)) {
            if (firstLogin) addUser();
            setFirtLogin(false);
          } else {
            setFirtLogin(false);
          }
        if (user)
          onSnapshot(collection(db, "fam"), (snapshot) =>
            snapshot.docs.map((doc) => {
              if (doc.data().users.includes(user.email)) {
                setFamId(doc.id);
                setFam(doc.data().users);
              }
            })
          );
      }),
    [user]
  );

  useState(() => {
    if (!user) {
      setFam([]);
      setFamId(null);
      setIsSignIn(false);
      setExpenses([]);
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    });

    setExpenses([]);

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
              id: doc.id,
            },
          ]);
        }
      })
    );

    if (fam.length != 0 && !isSignIn) {
      setWindow(0);
    }
  }, [window, db, auth]);

  return (
    <div className="App">
      <div className="offline">
        {" "}
        <Offline style={{ backgroundColor: "red" }}>Disconected</Offline>
      </div>
      {!isSignIn ? <Login window={window} setWindow={setWindow} /> : ""}
      {fam.length > 0 && isSignIn && window == 0 ? (
        <Dashboard
          expenses={expenses}
          window={window}
          setWindow={setWindow}
          fam={fam}
          months={months}
          setMonths={setMonths}
        />
      ) : (
        ""
      )}
      {fam.length > 0 && isSignIn && window == 1 ? (
        <Statistics
          fam={fam}
          expenses={expenses}
          setWindow={setWindow}
          months={months}
          setMonths={setMonths}
        />
      ) : (
        ""
      )}
      {fam.length > 0 && isSignIn && window == 2 ? (
        <AddExpense setWindow={setWindow} />
      ) : (
        ""
      )}
      {fam.length > 0 && isSignIn && window == 3 ? (
        <History expenses={expenses} window={window} setWindow={setWindow} />
      ) : (
        ""
      )}
      {fam.length > 0 && isSignIn && window == 4 ? (
        <User setWindow={setWindow} />
      ) : (
        ""
      )}
      {user && (fam.length == 0 || window == 8) ? (
        <Family fam={fam} setFam={setFam} famId={famId} setFamId={setFamId} />
      ) : (
        ""
      )}
      {fam.length > 0 && isSignIn ? (
        <Nav window={window} setWindow={setWindow} />
      ) : (
        ""
      )}
      {/* {expenses.length == 0 ? <Loading /> : ""} */}
      {fam == [] ? <Family /> : ""}
    </div>
  );
}

export default App;
