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
  const [labels, setLabels] = useState([]);
  const [monthsA, setMonthsA] = useState(
    months.sort(
      (b, c) => new Date(b.year, b.month, 1) - new Date(c.year, c.month, 1)
    )
  );
  const [cats, setCats] = useState([]);
  const colors = {
    backgroundColor: [
      "rgba(255, 99, 132, 0.9)",
      "rgba(25, 25, 252, 0.9)",
      "rgba(255, 206, 86, 0.9)",
      "rgba(75, 192, 192, 0.9)",
      "rgba(153, 102, 255, 0.9)",
      "rgba(255, 155, 132, 0.9)",
      "#efed63",
      "#63ef70",
      "#636bef",
      "#d663ef",
    ],
    borderColor: [
      "rgba(255, 0, 76, 0)",
      "rgba(0, 141, 255, 0)",
      "rgba(255, 176, 0, 0)",
      "rgba(0, 228, 255, 0)",
      "rgba(84, 0, 255, 0)",
    ],
    borderColorLines: [
      "rgba(255, 99, 132, 0.9)",
      "rgba(25, 25, 252, 0.9)",
      "rgba(255, 206, 86, 0.9)",
      "rgba(75, 192, 192, 0.9)",
      "rgba(153, 102, 255, 0.9)",
      "rgba(255, 155, 132, 0.9)",
      "#efed63",
      "#63ef70",
      "#636bef",
      "#d663ef",
    ],
  };

  useEffect(() => {
    getCats();
    getLabels();
  }, []);

  const getCatSum = (cat) => {
    let sum = expenses
      .filter((obj) => obj.category === cat)
      .reduce((a, c) => a + c.sum, 0);

    return sum;
  };

  const getSumCatMonths = (cat) => {
    let monthTab = [];
    monthsA.forEach((mon) => {
      let month = expenses
        .filter((obj) => {
          let date = new Date(
            obj.time?.seconds * 1000 + obj.time?.nanoseconds / 1000000
          );

          return (
            date.getMonth() + 1 === mon.month &&
            date.getYear() + 1900 === mon.year &&
            obj.category === cat
          );
        })
        .reduce((a, c) => a + c.sum, 0);

      monthTab.push(month);
    });

    return monthTab;
  };

  const getLabels = () => {
    let months = monthsA.map((mon) => mon.month + "." + mon.year);

    setLabels(months);
  };

  const getCats = () => {
    let cats = new Set(expenses.map((elem) => elem.category));
    let array = [...cats];
    let index = array.indexOf(null);

    array.splice(index, 1);
    setCats(array);
  };

  const dataLines = {
    labels,

    datasets: cats.map((cat, ind) => ({
      label: cat,
      data: getSumCatMonths(cat),
      borderColor: colors.borderColorLines[ind % colors.backgroundColor.length],
      backgroundColor:
        colors.backgroundColor[ind % colors.backgroundColor.length],
    })),
  };

  const dataPie = {
    labels: cats,
    datasets: [
      {
        label: "# of Votes",
        data: cats.map((elem) => getCatSum(elem)),
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (expenses.length == 0) setWindow(0);
    }, 2);
    return () => clearInterval(interval);
  }, [window]);

  return (
    <div className="Statistics">
      {" "}
      <div className="top">
        <h1>Statystyki</h1>
      </div>
      <div className="family-list">
        <h3>Zale??no???? wydatk??w w kategoriach</h3>
        <div className="pie">
          <Pie options={optionsPie} data={dataPie} />
        </div>

        <h3>Wykres wydatk??w w miesi??cach</h3>
        <Line options={optionsLines} data={dataLines} />
      </div>
    </div>
  );
}

export default Statistics;
