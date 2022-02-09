import React, { useEffect, useState } from "react";
import "./style/Statistics.css";
import { db } from "../../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const optionsLines = {
  responsive: true,
  color: "white",

  plugins: {
    legend: {
      position: "top",
    },
  },
};
export const optionsPie = {
  responsive: true,
  color: "white",

  plugins: {
    legend: {
      position: "top",
      color: "white",
    },
  },
};

function Statistics({ fam, expenses, setWindow, months, setMonths }) {
  const [sum, setSum] = useState([]);
  const [zakupy, setZakupy] = useState([]);
  const [chemia, setChemia] = useState([]);
  const [ubrania, setUbrania] = useState([]);
  const [jedzenie, setJedzenie] = useState([]);
  const [rozrywka, setRozrywka] = useState([]);
  const [zakupyA, setZakupyA] = useState(0);
  const [chemiaA, setChemiaA] = useState(0);
  const [ubraniaA, setUbraniaA] = useState(0);
  const [jedzenieA, setJedzenieA] = useState(0);
  const [rozrywkaA, setRozrywkaA] = useState(0);
  const [labels, setLabels] = useState([]);
  const [monthsA, setMonthsA] = useState(months);
  useEffect(() => {
    setZakupy([]);
    setRozrywka([]);
    setJedzenie([]);
    setChemia([]);
    setUbrania([]);
    setZakupyA(0);
    setRozrywkaA(0);
    setJedzenieA(0);
    setChemiaA(0);
    setUbraniaA(0);
    setSum([]);
    setLabels([]);

    monthsA.map((elem, ind) => {
      setLabels((lab) => [...lab, elem.month + "." + elem.year]);
      var sumA = 0;
      var zakupyA = 0;
      var chemiaA = 0;
      var ubraniaA = 0;
      var jedzenieA = 0;
      var rozrywkaA = 0;
      expenses.map((exp, index) => {
        if (exp.sum) {
          let monthA = new Date(
            exp.time.seconds * 1000 + exp.time.nanoseconds / 1000000
          ).getMonth();
          let year = new Date(
            exp.time.seconds * 1000 + exp.time.nanoseconds / 1000000
          ).getYear();
          if (elem.month == monthA + 1 && elem.year == year + 1900) {
            sumA += exp.sum;

            switch (exp.category) {
              case "Zakupy":
                zakupyA += exp.sum;
                setZakupyA((a) => a + exp.sum);
                break;
              case "Chemia":
                chemiaA += exp.sum;
                setChemiaA((a) => a + exp.sum);
                break;
              case "Ubrania":
                ubraniaA += exp.sum;
                setUbraniaA((a) => a + exp.sum);
                break;
              case "Jedzenie":
                jedzenieA += exp.sum;
                setJedzenieA((a) => a + exp.sum);
                break;
              case "Rozrywka":
                rozrywkaA += exp.sum;
                setRozrywkaA((a) => a + exp.sum);
                break;
              default:
                break;
            }
          }
        }
      });
      setZakupy((s) => [...s, zakupyA]);
      setRozrywka((s) => [...s, rozrywkaA]);
      setJedzenie((s) => [...s, jedzenieA]);
      setChemia((s) => [...s, chemiaA]);
      setUbrania((s) => [...s, ubraniaA]);
      setSum((s) => [...s, sumA]);
    });
  }, []);

  const dataLines = {
    labels,

    datasets: [
      {
        label: "Suma",
        data: sum,

        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Zakupy",
        data: zakupy,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Chemia",
        data: chemia,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgb(255, 206, 86)",
      },
      {
        label: "Ubrania",
        data: ubrania,
        borderColor: "rgb(255, 255, 80)",
        backgroundColor: "rgb(255, 255, 60)",
      },
      {
        label: "Jedzenie",
        data: jedzenie,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Rozrywka",
        data: rozrywka,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgb(153, 102, 255)",
      },
    ],
  };

  const dataPie = {
    labels: ["Zakupy", "Chemia", "Ubrania", "Jedzenie", "Rozrywka"],
    datasets: [
      {
        label: "# of Votes",
        data: [zakupyA, chemiaA, ubraniaA, jedzenieA, rozrywkaA],
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (expenses.length == 0) setWindow(0);
    }, 10);
    return () => clearInterval(interval);
  }, [window]);

  return (
    <div className="Statistics">
      {" "}
      <div className="top">
        <h1>Statystyki</h1>
      </div>
      <div className="family-list">
        <h3>Zależność wydatków w kategoriach</h3>
        <Pie options={optionsPie} data={dataPie} />
        <h3>Wykres wydatków w miesiącach</h3>
        <Line options={optionsLines} data={dataLines} />
      </div>
    </div>
  );
}

export default Statistics;
