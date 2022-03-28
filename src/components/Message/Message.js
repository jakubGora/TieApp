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

function Message({
  message,
  close,
  isInput,
  delDocId,
  title,
  setWindow,
  setSortedExp,
}) {
  const [famId, setFamId] = useState("");
  const user = getAuth().currentUser;

  const joinFamily = async () => {
    onSnapshot(collection(db, "fam"), (snapshot) =>
      snapshot.docs.map((docu) => {
        if (
          docu.id === famId.trim() &&
          !docu.data().users.includes(user.email)
        ) {
          var users = docu.data().users;
          users.push(user.email);

          updateDoc(doc(db, "fam", famId.trim()), {
            users: users,
          });
        }
      })
    );
    close();
  };

  const delDocument = async (id) => {
    setSortedExp((prev) => prev.filter((e) => e.id !== id));
    close();
    await deleteDoc(doc(db, "expenses", id));
  };

  return (
    <div className="Message">
      <div className="window">
        <div className="window-top">
          <h2>{title}</h2>
          <button onClick={() => close()}>X</button>
        </div>
        <div className="window-bottom">
          <p>{message}</p>
          {isInput ? (
            <div>
              <input
                type="text"
                name="inp"
                id="inp"
                onChange={(e) => setFamId(e.target.value)}
                value={famId}
                autoFocus
              />
              <button onClick={() => joinFamily(famId)}>Dołącz</button>
            </div>
          ) : (
            ""
          )}

          {delDocId && (
            <button onClick={() => delDocument(delDocId)}>Usuń</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
