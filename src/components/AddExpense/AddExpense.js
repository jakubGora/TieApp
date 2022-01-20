import React from "react";
import "./style/AddExpense.css";
function AddExpense() {
  return (
    <div className="AddExpense">
      <div className="top">
        <h1>Category</h1>
      </div>
      <div className="cat-list">
        <div className="cat">Spożywcze</div>
        <div className="cat">Chemia</div>
        <div className="cat">Dla domu</div>
        <div className="cat">Rozrywka</div>
      </div>
    </div>
  );
}

export default AddExpense;
