import { useState } from "react";
import AddExpense from "./components/AddExpense/AddExpense";
import Dashboard from "./components/Dashboard/Dashboard";
import Nav from "./components/Nav/Nav";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import "./style/App.css";

function App() {
  const [window, setWindow] = useState(6);

  return (
    <div className="App">
      {window == 5 ? <Login window={window} setWindow={setWindow} /> : ""}
      {window == 6 ? <Register window={window} setWindow={setWindow} /> : ""}
      {window == 0 ? <Dashboard /> : ""}
      {window == 2 ? <AddExpense /> : ""}
      {window < 5 ? <Nav window={window} setWindow={setWindow} /> : ""}
    </div>
  );
}

export default App;
