import React from "react";
import "./style/Dashboard.css";
function Dashboard() {
  return (
    <div className="Dashboard">
      {" "}
      <div className="head">
        <h1>Dashboard</h1>
        <p>Dzień dobry</p>
      </div>
      <div className="mainInfo">
        <div className="text">
          <p>01.01 - dzisiaj:</p>

          <h2>346 zł</h2>
        </div>
      </div>
      <div className="infoList">
        <div className="info main">
          <p>Zakupy:</p> <strong>62 zł</strong>
        </div>
        <div className="info">
          <p>Chemia:</p> <strong>11 zł</strong>
        </div>
        <div className="info">
          <p>Ubrania:</p> <strong>21 zł</strong>
        </div>
        <div className="info">
          <p>Jedzenie:</p> <strong>29 zł</strong>
        </div>
        <div className="info">
          <p>Rozrywka:</p> <strong>81 zł</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
