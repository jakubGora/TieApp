import React, { useState, useRef } from "react";
import "./style/AddExpense.css";
import { f } from "@fortawesome/react-fontawesome";
import cart from "../../img/shopping-cart-solid.svg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
function AddExpense() {
  const [window, setWindow] = useState(0);
  const [category, setCategory] = useState();
  const [sum, setSum] = useState(null);
  const refInput = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const addExp = async () => {
    const docRef = await addDoc(collection(db, "expenses"), {
      category: category,
      sum: sum,
      email: user.email,
      time: Timestamp.now(),
    });
  };

  const dofusOnLoad = () => {
    // `current` wskazuje na zamontowany element kontrolki formularza
    refInput.current.focus();
    refInput.current.value = null;
  };

  return (
    <div className="AddExpense">
      {window == 0 ? (
        <div className="kat">
          <div className="top">
            <h1>Wybierz kategorię:</h1>
          </div>
          <div className="infoList">
            <div
              onClick={() => {
                setCategory("Zakupy");
                setWindow(1);
              }}
              className="info"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                className="svg-inline--fa fa-shopping-cart fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                ></path>
              </svg>
              <p>Zakupy</p>
            </div>
            <div
              onClick={() => {
                setCategory("Chemia");
                setWindow(1);
              }}
              className="info"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="prescription-bottle"
                className="svg-inline--fa fa-prescription-bottle fa-w-12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M32 192h120c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H32v64h120c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H32v64h120c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H32v64c0 17.6 14.4 32 32 32h256c17.6 0 32-14.4 32-32V128H32v64zM360 0H24C10.8 0 0 10.8 0 24v48c0 13.2 10.8 24 24 24h336c13.2 0 24-10.8 24-24V24c0-13.2-10.8-24-24-24z"
                ></path>
              </svg>
              <p>Chemia</p>
            </div>
            <div
              onClick={() => {
                setCategory("Ubrania");
                setWindow(1);
              }}
              className="info"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="tshirt"
                className="svg-inline--fa fa-tshirt fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"
                ></path>
              </svg>
              <p>Ubrania</p>
            </div>
            <div
              onClick={() => {
                setCategory("Jedzenie");
                setWindow(1);
              }}
              className="info"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="hamburger"
                className="svg-inline--fa fa-hamburger fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z"
                ></path>
              </svg>
              <p>Jedzenie</p>
            </div>
            <div
              onClick={() => {
                setCategory("Rozrywka");
                setWindow(1);
              }}
              className="info"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="theater-masks"
                className="svg-inline--fa fa-theater-masks fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M206.86 245.15c-35.88 10.45-59.95 41.2-57.53 74.1 11.4-12.72 28.81-23.7 49.9-30.92l7.63-43.18zM95.81 295L64.08 115.49c-.29-1.62.28-2.62.24-2.65 57.76-32.06 123.12-49.01 189.01-49.01 1.61 0 3.23.17 4.85.19 13.95-13.47 31.73-22.83 51.59-26 18.89-3.02 38.05-4.55 57.18-5.32-9.99-13.95-24.48-24.23-41.77-27C301.27 1.89 277.24 0 253.32 0 176.66 0 101.02 19.42 33.2 57.06 9.03 70.48-3.92 98.48 1.05 126.58l31.73 179.51c14.23 80.52 136.33 142.08 204.45 142.08 3.59 0 6.75-.46 10.01-.8-13.52-17.08-28.94-40.48-39.5-67.58-47.61-12.98-106.06-51.62-111.93-84.79zm97.55-137.46c-.73-4.12-2.23-7.87-4.07-11.4-8.25 8.91-20.67 15.75-35.32 18.32-14.65 2.58-28.67.4-39.48-5.17-.52 3.94-.64 7.98.09 12.1 3.84 21.7 24.58 36.19 46.34 32.37 21.75-3.82 36.28-24.52 32.44-46.22zM606.8 120.9c-88.98-49.38-191.43-67.41-291.98-51.35-27.31 4.36-49.08 26.26-54.04 54.36l-31.73 179.51c-15.39 87.05 95.28 196.27 158.31 207.35 63.03 11.09 204.47-53.79 219.86-140.84l31.73-179.51c4.97-28.11-7.98-56.11-32.15-69.52zm-273.24 96.8c3.84-21.7 24.58-36.19 46.34-32.36 21.76 3.83 36.28 24.52 32.45 46.22-.73 4.12-2.23 7.87-4.07 11.4-8.25-8.91-20.67-15.75-35.32-18.32-14.65-2.58-28.67-.4-39.48 5.17-.53-3.95-.65-7.99.08-12.11zm70.47 198.76c-55.68-9.79-93.52-59.27-89.04-112.9 20.6 25.54 56.21 46.17 99.49 53.78 43.28 7.61 83.82.37 111.93-16.6-14.18 51.94-66.71 85.51-122.38 75.72zm130.3-151.34c-8.25-8.91-20.68-15.75-35.33-18.32-14.65-2.58-28.67-.4-39.48 5.17-.52-3.94-.64-7.98.09-12.1 3.84-21.7 24.58-36.19 46.34-32.37 21.75 3.83 36.28 24.52 32.45 46.22-.73 4.13-2.23 7.88-4.07 11.4z"
                ></path>
              </svg>
              <p>Rozrywka</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {window == 1 ? (
        <div onLoad={() => dofusOnLoad()} className="exp-sum">
          <div className="top">
            <h1>Wprowadź kwotę:</h1>
          </div>

          <input
            value={sum}
            onChange={(e) => setSum(parseFloat(e.target.value))}
            type="number"
            ref={refInput}
            placeholder="Kwota"
            autoFocus
          />
          {sum > 0 ? (
            <button
              onClick={() => {
                console.log({ category, sum });
                addExp();
                setWindow(0);
                setSum(null);
              }}
            >
              Dodaj
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddExpense;
