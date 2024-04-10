import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Group_Page() {
  const [memberInfo, setMemberInfo] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const groupID = localStorage.getItem("selectedGroupId");
  const groupName = localStorage.getItem("selectedGroupName");

  useEffect(() => {
    const fetchGroupExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/exp/group/${groupID}`
        );
        setMemberInfo(response.data);
      } catch (error) {
        setError("Failed to fetch expense. Please try again.");
      }
    };

    fetchGroupExpenses();
  }, [groupID]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const member of memberInfo) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/getUserByID/${member.payer_id}`
          );
          console.log(response);
          names[member.payer_id] = response.data.name;
        } catch (error) {
          names[member.payer_id] = "Unknown";
        }
      }
      setUserNames(names);
    };

    if (memberInfo.length > 0) {
      fetchUserNames();
    }
  }, [memberInfo]);

  const handleViewClick = () => {
    navigate("/Participants");
  };
  const handleAdduniformClick = () => {
    navigate("/Uniform_Split");
  };
  const handleAddnonuniformClick = () => {
    navigate("/NonUni_Split");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("userID");
    navigate("/login_page");
  };
  const handleSettleUp = () => {
    navigate("/Settle_Up");
  };

  return (
    <div className="Group_Page">
      <br />
      <p>
        {" "}
        <span className="page-head-2">{groupName}</span>
      </p>
      <br />
      <br />
      <div className="expense-list">
        <h2>Group Expenses</h2>
        <ul>
          {memberInfo.map((member, index) => (
            <li className="expense-list" key={index}>
              <span style={{ color: "blue" }}>
                {userNames[member.payer_id]}
              </span>{" "}
              added{" "}
              <span style={{ color: "blue" }}>&#8377;{member.amount}</span> on{" "}
              <span style={{ color: "blue" }}>{member.date_time}</span> for{" "}
              <span style={{ color: "blue" }}>{member.type}</span>
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleViewClick}
        className="universal-button"
        style={{ margin: "5px 15px", color: "black" }} // Vertical margin added
      >
        View Members
      </button>
      <button
        onClick={handleAdduniformClick}
        className="universal-button"
        style={{ margin: "5px 15px", color: "black" }} // Vertical margin added
      >
        Add Uniform Split
      </button>
      <button
        onClick={handleAddnonuniformClick}
        className="universal-button"
        style={{ margin: "5px 15px", color: "black" }} // Vertical margin added
      >
        Add Non-Uniform Split
      </button>
      <button
        onClick={handleSettleUp}
        className="universal-button"
        style={{ margin: "5px 15px", color: "black" }} // Vertical margin added
      >
        Settle Up
      </button>
      <button
        onClick={handleLogoutClick}
        className="universal-button"
        style={{ margin: "5px 15px", color: "black" }} // Vertical margin added
      >
        Log Out
      </button>
    </div>
  );
}

export default Group_Page;
