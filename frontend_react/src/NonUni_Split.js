//NonUni_Split.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function NonUni_Split() {
  const [inputData, setInputData] = useState({
    amount: "",
    type: "",
  });
  const [participantExpenses, setParticipantExpenses] = useState(new Map());
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const userID = localStorage.getItem("userID");
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sg/getMembers/${groupID}`
        );
        setMembers(response.data);
      } catch (error) {
        setError("Failed to fetch members. Please try again.");
      }
    };

    fetchMembers();
  }, [groupID]);

  const handleExpenseChange = (userId, value) => {
    setParticipantExpenses((prevExpenses) => {
      const updatedExpenses = new Map(prevExpenses);
      updatedExpenses.set(userId, value);
      return updatedExpenses;
    });
  };

  const validateAmounts = () => {
    const totalAmount = parseFloat(inputData.amount);
    let totalExpenses = 0;

    participantExpenses.forEach((amount) => {
      totalExpenses += parseFloat(amount);
    });

    return totalExpenses === totalAmount;
  };

  const handleAddExpense = async (amount, type, expensesMap) => {
    try {
      const isValid = validateAmounts();
      if (!isValid) {
        setError("Total participant amount is not equal to the total amount.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/exp/groups/${groupID}/expenses/${userID}`,
        {
          amount: amount,
          type: type,
          splitAmount: Object.fromEntries(expensesMap),
        }
      );
      navigate("/Group_Page");
    } catch (error) {
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpense(inputData.amount, inputData.type, participantExpenses);
  };

  return (
    <div className="NonUni_Split">
      <br />
      <p>
        <span className="page-head-2">{groupName}</span>
      </p>
      <br />
      <br />
      <div className="normal-info">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="amount"
              className="normal-info"
              style={{ marginLeft: "18rem", marginRight: "-18rem" }}
            >
              Amount
            </label>
            <input
              type="text"
              name="amount"
              placeholder="amount"
              value={inputData.amount}
              onChange={(e) =>
                setInputData({ ...inputData, amount: e.target.value })
              }
            />
            <br />
            <br />
          </div>
          <div>
            <label
              htmlFor="type"
              className="normal-info"
              style={{ marginLeft: "18rem", marginRight: "-16.25rem" }}
            >
              Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="type"
              value={inputData.type}
              onChange={(e) =>
                setInputData({ ...inputData, type: e.target.value })
              }
            />
            <br />
            <br />
          </div>
          <div>
            <h3 style={{ marginLeft: "18rem" }}>Select Participants:</h3>
            {members.map((member) => (
              <div key={member.user_id}>
                <label
                  style={{ marginLeft: "18rem" }}
                  htmlFor={`${member.user_id}`}
                >
                  {member.name}
                </label>
                <input
                  type="text"
                  id={`${member.user_id}`}
                  style={{ marginLeft: "7.5rem" }}
                  placeholder="enter member's amount"
                  value={participantExpenses.get(member.user_id) || ""}
                  onChange={(e) =>
                    handleExpenseChange(member.user_id, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <br />
          <br />
          <br />
          <div>
            <button
              type="submit"
              className="universal-button"
              style={{ marginLeft: "25rem" }}
            >
              Add Expense
            </button>
          </div>
          {success && <p>Expense added successfully. Redirecting...</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default NonUni_Split;
