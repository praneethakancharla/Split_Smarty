import React, { useState, useEffect } from "react";
import axios from "axios";

function AddExpensePage() {
  const [totalExpense, setTotalExpense] = useState(0);
  const [members, setMembers] = useState([]);
  const [splits, setSplits] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const groupAdminID = localStorage.getItem("groupAdminID");

  useEffect(() => {
    // Fetch all members of the group
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllMembers");
        setMembers(response.data);
        // Initialize splits with equal amounts for each member
        const initialSplits = {};
        response.data.forEach((member) => {
          initialSplits[member.id] = totalExpense / response.data.length;
        });
        setSplits(initialSplits);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSplitChange = (memberID, splitAmount) => {
    // Update the split amount for the member
    setSplits((prevSplits) => ({
      ...prevSplits,
      [memberID]: parseFloat(splitAmount),
    }));
  };

  const handleTotalExpenseChange = (event) => {
    setTotalExpense(parseFloat(event.target.value));
  };

  const handleSubmit = async () => {
    // Perform the submission logic here
    console.log("Total Expense:", totalExpense);
    console.log("Splits:", splits);
    console.log("Is Admin:", isAdmin);
    // Make the API call to add the expense
  };

  return (
    <div>
      <h1>Add Expense</h1>
      <label htmlFor="totalExpense">Total Expense:</label>
      <input
        type="number"
        id="totalExpense"
        value={totalExpense}
        onChange={handleTotalExpenseChange}
      />
      <h2>Members:</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - Split:{" "}
            <input
              type="number"
              value={splits[member.id]}
              onChange={(e) => handleSplitChange(member.id, e.target.value)}
              disabled={isAdmin && member.id === groupAdminID}
            />
          </li>
        ))}
      </ul>
      <label htmlFor="isAdminCheckbox">Admin Split:</label>
      <input
        type="checkbox"
        id="isAdminCheckbox"
        checked={isAdmin}
        onChange={handleCheckboxChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddExpensePage;
