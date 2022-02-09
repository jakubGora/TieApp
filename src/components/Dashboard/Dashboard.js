import React, { useEffect, useState } from "react";
import defUserImg from "../../img/defUser.png";
import "./style/Dashboard.css";

import { getAuth } from "firebase/auth";
function Dashboard({ expenses, window, setWindow, fam, months, setMonths }) {
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getYear();
  const [zakupy, setZakupy] = useState(0);
  const [chemia, setChemia] = useState(0);
  const [ubrania, setUbrania] = useState(0);
  const [jedzenie, setJedzenie] = useState(0);
  const [rozrywka, setRozrywka] = useState(0);
  const [userSum, setUserSum] = useState(0);
  const [sum, setSum] = useState(0);
  const [cat, setCat] = useState();

  const [disconected, setDisconected] = useState(false);
  const [currentMonth, setCurrentM] = useState({
    month: 0,
    year: 0,
  });
  const user = getAuth().currentUser;
  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      if (expenses.length == 0) setWindow(1);
    }, 10);
    return () => clearInterval(interval);
  }, [window]);

  useEffect(() => {
    if (currentMonth.year == 0 && months.length > 0) {
      setMonths((a) => a.sort((a, b) => a.year - b.year || a.month - b.month));
      setCurrentM(months[0]);
    }
  }, []);

  const getExpensesSum = (email) => {
    let sumExp = 0;

    expenses.map((ex) => {
      if (ex.sum) {
        let monthA = new Date(
          ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
        ).getMonth();
        let year = new Date(
          ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
        ).getYear();
        if (
          ex.email == email &&
          monthA + 1 === currentMonth.month &&
          year + 1900 === currentMonth.year
        ) {
          if (ex.category == cat || cat == null) sumExp += ex.sum;
        }
      }
    });

    return [Math.round((sumExp * 100) / sum), sumExp];
  };

  useEffect(() => {
    setZakupy(0);
    setChemia(0);
    setUbrania(0);
    setJedzenie(0);
    setRozrywka(0);
    setSum(0);
    setUserSum(0);

    setMonths([]);
    expenses.map((ex) => {
      if (ex.sum) {
        let monthA = new Date(
          ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
        ).getMonth();
        let year = new Date(
          ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
        ).getYear();

        setMonths((months) => [
          ...months,
          { month: monthA + 1, year: year + 1900 },
        ]);

        if (
          monthA + 1 == currentMonth.month &&
          year + 1900 === currentMonth.year
        ) {
          if (ex.email == user.email) setUserSum((userSum) => userSum + ex.sum);
          setSum((sum) => sum + ex.sum);

          switch (ex.category) {
            case "Zakupy":
              if (ex.email == user.email)
                setZakupy((zakupy) => zakupy + ex.sum);

              break;
            case "Chemia":
              if (ex.email == user.email)
                setChemia((chemia) => chemia + ex.sum);

              break;
            case "Ubrania":
              if (ex.email == user.email)
                setUbrania((ubrania) => ubrania + ex.sum);

              break;
            case "Jedzenie":
              if (ex.email == user.email)
                setJedzenie((jedzenie) => jedzenie + ex.sum);

              break;
            case "Rozrywka":
              if (ex.email == user.email)
                setRozrywka((rozrywka) => rozrywka + ex.sum);

              break;
            default:
              break;
          }
        }
      }
    });

    setMonths((months) => [
      ...new Map(
        months.map((item) => [item["month"] || item["year"], item])
      ).values(),
    ]);
  }, [expenses, currentMonth]);

  return (
    <div className="Dashboard">
      <div className="head">
        <div>
          <h1>Dashboard</h1>
          <p>
            Dzień dobry{" "}
            {user.displayName
              ? user.displayName
              : user.email.substring(0, user.email.indexOf("@"))}
          </p>
        </div>

        <img
          src={user.photoURL ? user.photoURL : defUserImg}
          alt="img"
          onClick={() => setWindow(4)}
        />
      </div>
      <div onClick={() => setCat(null)} className="mainInfo">
        <div className="text">
          <select
            onChange={(e) => {
              setCurrentM(months[e.target.value]);
            }}
          >
            {months.map((a, i) => (
              <option key={i} value={i}>
                {monthNames[a.month - 1] + " " + a.year}
              </option>
            ))}
          </select>
          <h2>
            {Math.round(userSum * 1000) / 1000} zł{" "}
            <s>/ {Math.round(sum * 1000) / 1000} zł</s>
          </h2>
        </div>
      </div>

      <div onClick={() => setCat(null)} className="graph">
        <div className="content">
          {fam.map((el, i) => (
            <div
              key={i}
              className="bar"
              style={{ height: `${getExpensesSum(el)[0]}%` }}
            >
              {/* <p>{getExpensesSum(el)[0] + "%"}</p> */}

              <p>{getExpensesSum(el)[1] + "zł"}</p>
            </div>
          ))}
        </div>

        <div className="line"></div>
        <div className="labels">
          {fam.map((el, i) => (
            <div key={i} className="label">
              {el.substring(0, el.indexOf("@"))}
            </div>
          ))}
        </div>
      </div>

      <div className="infoList">
        <div
          onClick={() => setCat("Zakupy")}
          className={`info ${cat == "Zakupy" ? "main" : ""}`}
        >
          <p>Zakupy:</p> <strong>{zakupy} zł</strong>
        </div>
        <div
          onClick={() => setCat("Chemia")}
          className={`info ${cat == "Chemia" ? "main" : ""}`}
        >
          <p>Chemia:</p> <strong>{chemia} zł</strong>
        </div>
        <div
          onClick={() => setCat("Ubrania")}
          className={`info ${cat == "Ubrania" ? "main" : ""}`}
        >
          <p>Ubrania:</p> <strong>{ubrania} zł</strong>
        </div>
        <div
          onClick={() => setCat("Jedzenie")}
          className={`info ${cat == "Jedzenie" ? "main" : ""}`}
        >
          <p>Jedzenie:</p> <strong>{jedzenie} zł</strong>
        </div>
        <div
          onClick={() => setCat("Rozrywka")}
          className={`info ${cat == "Rozrywka" ? "main" : ""}`}
        >
          <p>Rozrywka:</p> <strong>{rozrywka} zł</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
