import React, { useEffect, useState } from "react";
import "./style/Family.css";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Message from "../Message/Message";

function Family({ fam, setFam }) {
  const user = getAuth().currentUser;
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    console.log(fam);
  }, []);

  const addFamily = async () => {
    addDoc(collection(db, "fam"), {
      users: [user.email],
    });
    onSnapshot(collection(db, "fam"), (snapshot) =>
      snapshot.docs.map((doc) => {
        if (doc.data().users.includes(user.email)) {
          setFam(doc.data().users);
        }
      })
    );
  };

  return (
    <div className="Family">
      {" "}
      <div className="top">
        <h1>Rodzina</h1>
      </div>
      <div className="family-list">
        {fam.map((q, n) => (
          <div className="list-elem" key={n}>
            {q}
          </div>
        ))}
        {fam.length > 0 ? (
          ""
        ) : (
          <div>
            <button onClick={() => addFamily()}>Załóż rodzinę</button>
            <button onClick={() => setMsg(true)}>Dołącz do rodziny</button>
          </div>
        )}
        {msg ? (
          <Message
            message={"Wprowadź kod rodziny:"}
            close={() => setMsg(false)}
            isInput={true}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Family;
