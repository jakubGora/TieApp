import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./style/History.css";

function History({ expenses }) {
  const user = getAuth().currentUser;

  return (
    <div className="History">
      {" "}
      <div className="top">
        <h1>Historia</h1>
      </div>
      <div className="list">
        <div className="elem">
          <div className="box">
            <h2>Kategoria</h2>
          </div>
          <div className="box">
            <h2>Koszt</h2>
          </div>
          <div className="box">
            <h2>Data</h2>
          </div>
          <div className="box"></div>
        </div>
        {expenses.map((elem, i) =>
          elem.email == user.email ? (
            <div key={i} className="elem">
              <div className="box">
                <h2>{elem.category}</h2>
              </div>
              <div className="box">
                <h3>{elem.sum} zł</h3>
              </div>
              <div className="box">
                <p>
                  {new Date(
                    elem.time.seconds * 1000 + elem.time.nanoseconds / 1000000
                  ).toLocaleString()}
                </p>
              </div>
              <div className="box">
                <button>X</button>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}

export default History;
