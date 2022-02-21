import React, { useEffect, useRef, useState } from "react";
import defUserImg from "../../img/defUser.png";
import "./style/Dashboard.css";

import { getAuth } from "firebase/auth";
function Dashboard({ expenses, window, setWindow, fam, months, setMonths }) {
  const [userSum, setUserSum] = useState(0);
  const [sum, setSum] = useState(0);
  const [monthsA, setMonthsA] = useState(
    months.sort(
      (c, b) => new Date(b.year, b.month, 1) - new Date(c.year, c.month, 1)
    )
  );
  const [cat, setCat] = useState();
  const [cats, setCats] = useState([]);
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
  const selectElem = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (expenses.length == 0) setWindow(1);
    }, 10);
    return () => clearInterval(interval);
  }, [window]);

  useEffect(() => {
    setCurrentM(null);
  }, []);

  const getExpensesSum = (email) => {
    let sumExp = 0;
    let suma = 0;
    expenses.map((ex) => {
      if (ex.sum) {
        let monthA = new Date(
          ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
        ).getMonth();
        let year = new Date(
          ex.time.seconds * 1000 + ex.time.nanoseconds / 1000000
        ).getYear();
        if (
          ((monthA + 1 === currentMonth?.month &&
            year + 1900 === currentMonth?.year) ||
            !currentMonth) &&
          (ex.category === cat || !cat)
        ) {
          if (ex.email === email) {
            sumExp += ex.sum;
          }
          suma += ex.sum;
        }
      }
    });
    if (!suma) suma = sum;

    return [Math.round((sumExp * 100) / suma), sumExp];
  };

  const getDateFirestore = (time) => {
    return new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
  };

  useEffect(() => {
    getCats();

    setSum(0);
    setUserSum(0);

    setMonths([]);
    expenses.map((ex) => {
      if (ex.sum) {
        let monthA = getDateFirestore(ex.time).getMonth();
        let year = getDateFirestore(ex.time).getYear();

        setMonths((months) => [
          ...months,
          { month: monthA + 1, year: year + 1900 },
        ]);

        if (
          (monthA + 1 === currentMonth?.month &&
            year + 1900 === currentMonth?.year) ||
          !currentMonth
        ) {
          if (ex.email == user.email) setUserSum((userSum) => userSum + ex.sum);
          setSum((sum) => sum + ex.sum);
        }
      }
    });

    setMonths((months) => [
      ...new Map(
        months.map((item) => [item["month"] || item["year"], item])
      ).values(),
    ]);
  }, [expenses, currentMonth]);

  const getCatSum = (cat) => {
    let sum = expenses
      .filter(
        (obj) =>
          obj.category === cat &&
          obj.email === user.email &&
          ((getDateFirestore(obj.time).getMonth() + 1 === currentMonth?.month &&
            getDateFirestore(obj.time).getYear() + 1900 ===
              currentMonth?.year) ||
            !currentMonth)
      )
      .reduce((a, c) => a + c.sum, 0);

    return sum;
  };

  const getCats = () => {
    let cats = new Set(expenses.map((elem) => elem.category));
    let array = [...cats];
    let index = array.indexOf(null);

    array.splice(index, 1);
    setCats(array);
  };
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
      <div
        onClick={() => {
          setCat(null);
        }}
        className="mainInfo"
      >
        <div className="text">
          <select
            ref={selectElem}
            onChange={(e) => {
              setCurrentM(months[e.target.value]);
            }}
          >
            <option key={0} value={null} defaultValue>
              All
            </option>
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
        {cats.map((elem, ind) => (
          <div
            key={ind}
            onClick={() => setCat(elem)}
            className={`info ${cat == elem ? "main" : ""}`}
          >
            <p>{elem}</p> <strong>{getCatSum(elem)} zł</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
