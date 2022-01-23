import React, { useEffect, useState } from "react";
import "./style/Family.css";
import { db } from "../../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function Family() {
  const [family, setFamily] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, "fam"),
      (snapshot) => {
        setFamily(snapshot.docs[0].data().users);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div className="Family">
      {" "}
      <div className="top">
        <h1>Rodzina</h1>
      </div>
      <div className="family-list">
        {family.map((q, n) => (
          <div className="list-elem" key={n}>
            <div className="graph">Wykres</div>
            <div className="title">{q}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Family;
