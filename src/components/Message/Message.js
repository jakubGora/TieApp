import React, { useEffect, useState } from "react";

import "./style/Message.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

function Message({ message, close, isInput, delDocId, title, setWindow }) {
  const [famId, setFamId] = useState("");
  const user = getAuth().currentUser;

  const joinFamily = async () => {
    onSnapshot(collection(db, "fam"), (snapshot) =>
      snapshot.docs.map((docu) => {
        if (docu.id === famId && !docu.data().users.includes(user.email)) {
          var users = docu.data().users;
          users.push(user.email);

          updateDoc(doc(db, "fam", famId), {
            users: users,
          });
        }
      })
    );
  };

  const delDocument = async (id) => {
    setWindow(1);
    await deleteDoc(doc(db, "expenses", id));
  };

  return (
    <div className="Message">
      <div className="window">
        <div className="window-top">
          <h2>{title}</h2>
          <button onClick={() => close()}>X</button>
        </div>

        <p>{message}</p>
        {isInput ? (
          <div>
            <input
              type="text"
              name="inp"
              id="inp"
              onChange={(e) => setFamId(e.target.value)}
              value={famId}
            />
            <button onClick={() => joinFamily(famId)}>Dołącz</button>
          </div>
        ) : (
          ""
        )}

        {delDocId ? (
          <button onClick={() => delDocument(delDocId)}>Usuń</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Message;
