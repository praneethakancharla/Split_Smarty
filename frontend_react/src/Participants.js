//Participants.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Participants() {
  const [memberInfo, setMemberInfo] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const groupID = localStorage.getItem("selectedGroupId");
  const userID = localStorage.getItem("userID");
  const groupName = localStorage.getItem("selectedGroupName");

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sg/getMembers/${groupID}`);
        setMemberInfo(response.data); // Set memberInfo to response.data
      } catch (error) {
        setError("Failed to fetch members. Please try again.");
      }
    };
  
    fetchGroupMembers();
  }, [groupID]);
  
  // const checkAdminStatus = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/sg/groups/${groupID}/user/${userId}`);
  //     console.log(userId);
  //     console.log("Admin status response:", response.data); // Log the response data
  //      return response.data === "he is admin";
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       console.log("User is not an admin.");
  //       return false;
  //     } else {
  //       console.error("Failed to check admin status:", error);
  //       return null; // Return null for other error cases
  //     }
  //   }
  // };
 
  
  // const handleRemoveMember = async (memberId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/sg/groups/${groupID}/admin/${userID}/remove/${memberId}`);
  //     // Refresh group list after leaving the group
  //     navigate("/Display_Groups");
  //   } catch (error) {
  //     setError("Failed to leave group. Please try again.");
  //   }
  // };
  const handleAddClick = () => {
    navigate("/Add_Participant");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userID");
    navigate("/login_page");
  };

  return (
    <div className="Participants">
      <br />
      <p>
        <span className="page-head-2">{groupName}</span>
      </p>
      <br />
      <br />
      <div className="group-members">
        <h2>Group Members:</h2>
        {memberInfo.length > 0 ? (
          <ul>
          {memberInfo.map((member, index) => (
            <li className="expense-list" style={{fontSize: "1.5rem", paddingBottom: "1rem"}} key={index}>
              {member.name} 
              {/* {member.user_id}  
               {checkAdminStatus(member.user_id) ? "(Admin)" : "(Participant)"} */}
               {/* <button className="universal-button" onClick={handleRemoveMember(member.user_id)}>Remove Member</button> */}
            </li>
          ))}
        </ul>
        ) : (
          <p>No members found.</p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleAddClick}
        className="universal-button"
        style={{ marginLeft: "25rem" }}
      >
        Add Members
      </button>
      <br />
      <br />
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

export default Participants;