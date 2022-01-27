import React, { useEffect, useState } from "react";
import "./style/Statistics.css";
import { db } from "../../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Statistics({ fam, expenses, setWindow }) {
  const getPercent = (cat, email) => {
    var elemSum = 0;
    var sum = 0.1;
    expenses.map((elem) => {
      if (elem.category == cat || cat == "All") {
        sum += elem.sum;
        if (elem.email == email) elemSum += elem.sum;
      }
    });

    return (elemSum / sum) * 100;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (expenses.length == 0) setWindow(0);
    }, 10);
    return () => clearInterval(interval);
  }, [window]);
  return (
    <div className="Statistics">
      {" "}
      <div className="top">
        <h1>Statystyki</h1>
      </div>
      <div className="family-list">
        {fam.map((q, n) => (
          <div className="list-elem" key={n}>
            <div className="graph">
              <div className="content">
                <div
                  className="bar"
                  style={{ height: `${getPercent("Zakupy", q)}%` }}
                >
                  <p>{Math.round(getPercent("Zakupy", q))}%</p>
                </div>
                <div
                  className="bar"
                  style={{ height: `${getPercent("Chemia", q)}%` }}
                >
                  {" "}
                  <p>{Math.round(getPercent("Chemia", q))}%</p>
                </div>
                <div
                  className="bar"
                  style={{ height: `${getPercent("Ubrania", q)}%` }}
                >
                  {" "}
                  <p>{Math.round(getPercent("Ubrania", q))}%</p>
                </div>
                <div
                  className="bar"
                  style={{ height: `${getPercent("Jedzenie", q)}%` }}
                >
                  {" "}
                  <p>{Math.round(getPercent("Jedzenie", q))}%</p>
                </div>
                <div
                  className="bar"
                  style={{ height: `${getPercent("Rozrywka", q)}%` }}
                >
                  {" "}
                  <p>{Math.round(getPercent("Rozrywka", q))}%</p>
                </div>
                <div
                  className="bar"
                  style={{ height: `${getPercent("All", q)}%` }}
                >
                  {" "}
                  <p>{Math.round(getPercent("All", q))}%</p>
                </div>
              </div>
              <div className="labels">
                <div className="label">Zakupy</div>
                <div className="label">Chemia</div>
                <div className="label">Ubrania</div>
                <div className="label">Jedzenie</div>
                <div className="label">Rozrywka</div>
                <div className="label">Razem</div>
              </div>
            </div>
            <div className="title">{q}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
