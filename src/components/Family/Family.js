import React, { useEffect, useState } from "react";
import "./style/Family.css";
import { db } from "../../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Family({ fam }) {
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
      </div>
    </div>
  );
}

export default Family;
