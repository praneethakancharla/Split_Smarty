import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add_Participant() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const containerStyle = {
    margin: "16% auto",
    maxWidth: "40%",
    padding: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    textAlign: "center",
    backgroundColor: "transparent", // Changed to transparent background
    fontSize: "20px",
  };

  const labelStyle = {
    fontSize: "20px",
    marginBottom: "10px",
  };

  const inputStyle = {
    fontSize: "20px",
    marginLeft: "0rem",
    padding: "8px",
    marginBottom: "20px",
    marginTop: "5px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    fontSize: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "18px", // Increased text size
    textAlign: "center", // Center align the button
    margin: "0 auto", // Center the button
  };

  const handleAddUserToGroup = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/sg/addMember/${groupID}`,
        {
          email: email,
          addingMember: userID,
        }
      );
      if (response.status === 200) {
        setEmail("");
        setError("");
        setSuccessMessage("Member added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          alert("Member added successfully!"); // Alert message on successful addition
          navigate("/Participants");
        }, 3000);
      } else {
        setError("Failed to add user to group.");
      }
    } catch (error) {
      if (error.response.status !== 500) {
        setError(error.response.data.error);
      } else {
        setError("Failed to add user to group. Server Not Responding ");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <p style={{ fontSize: "24px", marginBottom: "20px" }}>{groupName}</p>
      <label htmlFor="email" style={labelStyle}>
        Enter user's email:
      </label>
      <input
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="new member's email"
        style={inputStyle}
      />
      <button
        className="universal-button"
        onClick={handleAddUserToGroup}
        style={buttonStyle}
      >
        Add
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default Add_Participant;
