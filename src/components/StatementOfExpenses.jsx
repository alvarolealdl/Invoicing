import React, { useState } from "react";
import axios from "axios";

const StatementOfExpenses = ({ expenses, onExpenseChange }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSubmittedExpenses, setTotalSubmittedExpenses] = useState(0);
  const [submittedExpenses, setSubmittedExpenses] = useState([]);
  const [inputExpenses, setInputExpenses] = useState(expenses);

  const handleExpenseChange = async (event, month) => {
    const { value } = event.target;
    const expenseValue = value !== "" && !isNaN(value) ? parseFloat(value) : 0;
    const updatedExpenses = { ...inputExpenses, [month]: expenseValue };
    setInputExpenses(updatedExpenses);
  };

  const handleExpenseBlur = (event, month) => {
    const { value } = event.target;
    const expenseValue = value === "" || isNaN(value) ? 0 : parseFloat(value);
    const updatedExpenses = { ...inputExpenses, [month]: expenseValue };
    setInputExpenses(updatedExpenses);
  };

  const updateExpensesInDb = async () => {
    const total = Object.values(inputExpenses).reduce(
      (acc, expense) => acc + expense,
      0
    );
    try {
      await axios.post("http://localhost:3000/expenses/", { inputExpenses });
    } catch (error) {
      console.log("Erro ao atualizar despesas:", error);
    }

    try {
      await axios.post("http://localhost:3000/totalExpenses/", { total });
      setTotalSubmittedExpenses(total);
    } catch (error) {
      console.log("Erro ao atualizar o valor total de despesas:", error);
    }

    setSubmittedExpenses([...submittedExpenses, inputExpenses]);
    setInputExpenses(expenses);
    setTotalExpenses(0);
    onExpenseChange("", 0);
  };

  const handleSubmitExpenses = () => {
    updateExpensesInDb();
  };

  return (
    <div className="statement-of-expenses">
      <h2 className="statement-of-expenses__title">Declaração de Despesas</h2>
      <form className="statement-of-expenses__form">
        <div className="statement-of-expenses__column">
          {Object.entries(inputExpenses).map(([month, expense], index) => {
            if (index % 3 === 0) {
              return (
                <div key={month} className="statement-of-expenses__input-group">
                  <label className="statement-of-expenses__label">
                    {month}
                  </label>
                  <input
                    type="number"
                    value={expense}
                    onChange={(event) => handleExpenseChange(event, month)}
                    onBlur={(event) => handleExpenseBlur(event, month)}
                    className="statement-of-expenses__input"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="statement-of-expenses__column">
          {Object.entries(inputExpenses).map(([month, expense], index) => {
            if (index % 3 === 1) {
              return (
                <div key={month} className="statement-of-expenses__input-group">
                  <label className="statement-of-expenses__label">
                    {month}
                  </label>
                  <input
                    type="number"
                    value={expense}
                    onChange={(event) => handleExpenseChange(event, month)}
                    onBlur={(event) => handleExpenseBlur(event, month)}
                    className="statement-of-expenses__input"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="statement-of-expenses__column">
          {Object.entries(inputExpenses).map(([month, expense], index) => {
            if (index % 3 === 2) {
              return (
                <div key={month} className="statement-of-expenses__input-group">
                  <label className="statement-of-expenses__label">
                    {month}
                  </label>
                  <input
                    type="number"
                    value={expense}
                    onChange={(event) => handleExpenseChange(event, month)}
                    onBlur={(event) => handleExpenseBlur(event, month)}
                    className="statement-of-expenses__input"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </form>
      <button
        className="statement-of-expenses__submit-button"
        onClick={handleSubmitExpenses}
      >
        Submeter Despesas
      </button>
      <div>
        <h3>Despesas Submetidas:</h3>
        <ul className="statement-of-expenses__submitted-expenses">
          {submittedExpenses.map((expense, index) => (
            <li
              key={index}
              className="statement-of-expenses__submitted-expense"
            >
              {Object.entries(expense).map(([month, value]) => (
                <span
                  key={month}
                  className="statement-of-expenses__submitted-expense-item"
                >&nbsp;{`${month}: ${value} ||`}</span>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <p className="statement-of-expenses__total-submitted-expenses">
        Total de Despesas Submetidas: {totalSubmittedExpenses}
      </p>
    </div>
  );
};

export default StatementOfExpenses;
