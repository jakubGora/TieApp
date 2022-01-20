import { useState } from "react";
import AddExpense from "./components/AddExpense/AddExpense";
import Dashboard from "./components/Dashboard/Dashboard";
import Nav from "./components/Nav/Nav";
import "./style/App.css";

function App() {
  const [window, setWindow] = useState(0);

  return (
    <div className="App">
      {window == 0 ? <Dashboard /> : ""}
      {window == 1 ? <AddExpense /> : ""}

      <Nav window={window} setWindow={setWindow} />
    </div>
  );
}

export default App;
