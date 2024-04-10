//Settle_Up.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Settle_Up() {
  const [settledExpenses, setSettledExpenses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");

  useEffect(() => {
    const fetchSettledExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/stl/expense/${groupID}`
        );
        const settledExpensesData = response.data;
        setSettledExpenses(settledExpensesData);
      } catch (error) {
        setError("Failed to fetch settled expenses. Please try again.");
      }
    };

    fetchSettledExpenses();
  }, [groupID]);

  const handlePay = async (expenseId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/stl/payment/${expenseId}`
      );
      console.log("Payment made for expense ID:", expenseId);
      // Assuming you want to display a success message to the user after successful payment
      alert("Payment successful!");
      // You can also perform additional actions after successful payment if needed
    } catch (error) {
      console.error("Error making payment:", error);
      // Handle error gracefully, such as displaying an error message to the user
      alert("Failed to make payment. Please try again later.");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userID");
    navigate("/login_page");
  };

  return (
    <div className="Settle_Up">
      <br />
      <p>
        {" "}
        <span className="page-head-2">{groupName}</span>
      </p>
      <br />
      <br />
      <div className="expense-list">
        <h2>Settled Expenses:</h2>
        {settledExpenses.map((expense) => (
          <div key={expense[3]}>
            {(expense[0] === parseInt(userID) ||
              expense[1] === parseInt(userID)) && (
              <div>
                {expense[0] === parseInt(userID) && (
                  <p>
                    You are owed &#8377;{expense[2]} by {expense[1]}
                  </p>
                )}
                {expense[1] === parseInt(userID) && (
                  <div>
                    <p>
                      You owe &#8377;{expense[2]} to {expense[0]}
                    </p>
                    <button onClick={() => handlePay(expense[3])}>Pay</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <p>Error: {error}</p>}
      <button
        onClick={handleLogoutClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Settle_Up;
