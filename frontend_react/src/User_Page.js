import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function User_Page() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:5000/api/users/getUserByID/${userID}`)
        .then((response) => {
          const matchedUser = response.data;
          if (matchedUser) {
            setUserInfo(matchedUser);
          } else {
            setError("User not found");
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [userID]);

  const handleViewGroupsClick = () => {
    navigate("/Display_Group");
  };

  const handleCreateGroupClick = () => {
    navigate("/Create_Group");
  };

  // const handleSettleExpensesClick = () => {
  //   navigate("/Settle_Expense");
  // };

  const handleLogoutClick = () => {
    // Logic to clear user session data and redirect to login page
    // For example, you can use localStorage to clear user data
    localStorage.removeItem("userID");
    navigate("/login_page");
  };

  return (
    <div className="User_Page">
      <br />
      <p>
        <span className="page-head-2">User Profile</span>
      </p>
      <br />
      <br />
      {userInfo && (
        <div className="normal-info">
          <p>Name: {userInfo.name}</p>
          <p>Contact No: {userInfo.contact}</p>
          <p>Email Address: {userInfo.email}</p>
          <p>UPI ID: {userInfo.upi_id}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <button
        onClick={handleViewGroupsClick}
        className="universal-button"
        style={{ marginLeft: "1.5rem", marginRight: "5rem" }}
      >
        View Groups
      </button>
      <button
        onClick={handleCreateGroupClick}
        className="universal-button"
        style={{ marginLeft: "1.5rem", marginRight: "5rem" }}
      >
        Create Group
      </button>
      <button
        onClick={handleLogoutClick}
        className="universal-button"
        style={{ marginLeft: "1.5rem", marginRight: "5rem" }}
      >
        Log Out
      </button>
    </div>
  );
}

export default User_Page;
