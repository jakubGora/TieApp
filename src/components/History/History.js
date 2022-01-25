import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./style/History.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
function History({ expenses, window, setWindow }) {
  const user = getAuth().currentUser;

  const delDocument = async (id) => {
    setWindow(1);
    await deleteDoc(doc(db, "expenses", id));
  };

  return (
    <div className="History">
      {" "}
      <div className="top">
        <h1>Twoja historia</h1>
      </div>
      <div className="list">
        <div className="elem head">
          <div className="box">
            <h2>Kategoria</h2>
          </div>
          <div className="box">
            <h2>Koszt</h2>
          </div>
          <div className="box">
            <h2>Data</h2>
          </div>
          <div className="box">
            <h3>Usuń</h3>
          </div>
        </div>
        <div className="scroll">
          {" "}
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
                  <button onClick={() => delDocument(elem.id)}>X</button>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
