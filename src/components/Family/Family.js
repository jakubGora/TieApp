import React, { useEffect, useState } from "react";
import "./style/Family.css";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Message from "../Message/Message";

function Family({ fam, setFam, famId, setFamId }) {
  const user = getAuth().currentUser;
  const [msg, setMsg] = useState(false);
  const auth = getAuth();
  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const leaveFam = async () => {
    if (fam.length > 1)
      await updateDoc(doc(db, "fam", famId), {
        users: fam.filter((e) => e !== user.email),
      });
    else await deleteDoc(doc(db, "fam", famId));
    setFam([]);
    setFamId(null);
  };

  const addFamily = async () => {
    addDoc(collection(db, "fam"), {
      users: [user.email],
    });
    const docRef = await addDoc(collection(db, "expenses"), {
      category: null,
      sum: null,
      email: user.email,
      time: null,
    });
    onSnapshot(collection(db, "fam"), (snapshot) =>
      snapshot.docs.map((doc) => {
        if (doc.data().users.includes(user.email)) {
          setFamId(doc.id);
          setFam(doc.data().users);
        }
      })
    );
  };

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="Family">
      {" "}
      <div className="top">
        <h1>Rodzina</h1>
      </div>
      <div className="family-list">
        {famId ? (
          <div className="FamId">
            <label>Identyfikator rodziny: </label>
            <input type="text" value={famId} readOnly />
          </div>
        ) : (
          ""
        )}
        {fam.length > 0 ? <h2>Członkowie:</h2> : ""}
        {fam.map((q, n) => (
          <div className="list-elem" key={n}>
            <p>
              {n + 1}. &nbsp;{q}
            </p>
          </div>
        ))}

        {famId ? (
          <div>
            <button
              onClick={() => {
                leaveFam();
              }}
            >
              Opuść rodzinę
            </button>
          </div>
        ) : (
          ""
        )}

        {fam.length > 0 ? (
          ""
        ) : (
          <div className="notCreated">
            <h2>
              Aby rozpocząć dołącz do rodziny lub utwórz własną aby inni mogli
              dołączyć do Ciebie
            </h2>
            <div>
              <button onClick={() => addFamily()}>Załóż rodzinę</button>
              <button onClick={() => setMsg(true)}>Dołącz do rodziny</button>
            </div>
            <h2>lub</h2>
            <button
              onClick={() => {
                SignOut();
              }}
            >
              Wyloguj
            </button>
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
