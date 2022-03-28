import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./style/History.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Message from "../Message/Message";
import delIco from "../../img/delete.png";
function History({ expenses, window, setWindow }) {
  const user = getAuth().currentUser;
  const [mess, setMess] = useState(false);
  const [id, setId] = useState();

  const [sortedExp, setSortedExp] = useState(
    expenses
      .filter((a) => a.time)
      .sort(
        (c, b) =>
          new Date(b.time.seconds * 1000 + b.time.nanoseconds / 1000000) -
          new Date(c.time.seconds * 1000 + c.time.nanoseconds / 1000000)
      )
  );

  return (
    <div className="History">
      {mess ? (
        <Message
          title={"Usuwanie"}
          message={"Czy na pewno chcesz usunąć element?"}
          close={() => setMess(false)}
          isInput={false}
          delDocId={id}
          setWindow={setWindow}
          setSortedExp={setSortedExp}
        />
      ) : (
        ""
      )}
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
          {sortedExp?.map((elem, i) =>
            elem.email == user.email && elem.category ? (
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
                  <button
                    onClick={() => {
                      setId(elem.id);
                      setMess(true);
                    }}
                  >
                    <img src={delIco} alt="del" />
                  </button>
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
