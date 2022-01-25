import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "./style/Dashboard.css";
import {
  setDoc,
  collection,
  addDoc,
  Timestamp,
  toDate,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
function Dashboard({ expenses, window }) {
  const [zakupy, setZakupy] = useState(0);
  const [zakupyA, setZakupyA] = useState(0);
  const [chemia, setChemia] = useState(0);
  const [chemiaA, setChemiaA] = useState(0);
  const [ubrania, setUbrania] = useState(0);
  const [ubraniaA, setUbraniaA] = useState(0);
  const [jedzenie, setJedzenie] = useState(0);
  const [jedzenieA, setJedzenieA] = useState(0);
  const [rozrywka, setRozrywka] = useState(0);
  const [rozrywkaA, setRozrywkaA] = useState(0);
  const [userSum, setUserSum] = useState(0);
  const [sum, setSum] = useState(0);
  const user = getAuth().currentUser;
  useEffect(() => {
    setZakupy(0);
    setChemia(0);
    setUbrania(0);
    setJedzenie(0);
    setRozrywka(0);
    setSum(0);
    setUserSum(0);
    var now = new Date();

    expenses.map((ex) => {
      let date = new Date(
        ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
      ).getMonth();

      if (date == now.getMonth()) {
        if (ex.email == user.email) setUserSum((userSum) => userSum + ex.sum);
        setSum((sum) => sum + ex.sum);

        console.log(sum);
        switch (ex.category) {
          case "Zakupy":
            if (ex.email == user.email) setZakupy((zakupy) => zakupy + ex.sum);
            setZakupyA((zakupy) => zakupy + ex.sum);
            break;
          case "Chemia":
            if (ex.email == user.email) setChemia((chemia) => chemia + ex.sum);
            setChemiaA((chemia) => chemia + ex.sum);
            break;
          case "Ubrania":
            if (ex.email == user.email)
              setUbrania((ubrania) => ubrania + ex.sum);
            setUbraniaA((ubrania) => ubrania + ex.sum);
            break;
          case "Jedzenie":
            if (ex.email == user.email)
              setJedzenie((jedzenie) => jedzenie + ex.sum);
            setJedzenieA((jedzenie) => jedzenie + ex.sum);
            break;
          case "Rozrywka":
            if (ex.email == user.email)
              setRozrywka((rozrywka) => rozrywka + ex.sum);
            setRozrywkaA((rozrywka) => rozrywka + ex.sum);
            break;
          default:
            break;
        }
      }
    });
  }, [window]);

  return (
    <div className="Dashboard">
      <div className="head">
        <h1>Dashboard</h1>
        <p>Dzień dobry</p>
      </div>
      <div className="mainInfo">
        <div className="text">
          <p>01.01 - dzisiaj:</p>

          <h2>
            {userSum} zł <s>/ {sum} zł</s>
          </h2>
        </div>
      </div>
      <div className="infoList">
        <div className="info main">
          <p>Zakupy:</p> <strong>{zakupy} zł</strong>
        </div>
        <div className="info">
          <p>Chemia:</p> <strong>{chemia} zł</strong>
        </div>
        <div className="info">
          <p>Ubrania:</p> <strong>{ubrania} zł</strong>
        </div>
        <div className="info">
          <p>Jedzenie:</p> <strong>{jedzenie} zł</strong>
        </div>
        <div className="info">
          <p>Rozrywka:</p> <strong>{rozrywka} zł</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
