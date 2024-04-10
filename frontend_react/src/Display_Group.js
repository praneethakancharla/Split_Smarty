import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import "./Display_Group.css";

function Display_Group() {
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sg/getUserGroups/${userID}`
        );
        setGroupNames(response.data);
      } catch (error) {
        setError("Failed to fetch user groups. Please try again.");
      }
    };
    if (userID) {
      fetchUserGroups();
    }
  }, [userID]);

  const handleGroupClick = (groupName, groupId, groupDescribe) => {
    localStorage.setItem("selectedGroupId", groupId);
    localStorage.setItem("selectedGroupName", groupName);
    localStorage.setItem("selectedGroupDescription", groupDescribe);
    navigate("/Group_Page");
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/sg/groups/${groupId}/users/${userID}/leave`
      );
      // Refresh group list after leaving the group
      navigate("/Display_Groups");
    } catch (error) {
      setError("Failed to leave group. Please try again.");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/sg/group/${groupId}/user/${userID}`
      );
      // Refresh group list after deleting the group
      navigate("/Display_Groups");
    } catch (error) {
      setError("Failed to delete group. Please try again.");
    }
  };

  return (
    <div className="your-groups-container">
      <p className="page-head-2">Your Groups</p>
      {groupNames.length === 0 ? (
        <p>No groups found for the user.</p>
      ) : (
        <div>
          {groupNames.map((group, index) => (
            <div key={index} className="group-container">
              <div className="group-details">
                <p className="group-name">{group.name}</p>
                <p className="group-description">{group.group_describe}</p>
              </div>
              <div className="group-buttons">
                <button
                  onClick={() =>
                    handleGroupClick(
                      group.name,
                      group.group_id,
                      group.group_describe
                    )
                  }
                  className="group-button"
                >
                  View Group
                </button>
                <button
                  className="leave-group-button"
                  onClick={() => handleLeaveGroup(group.group_id)}
                >
                  Leave
                </button>
                <button
                  className="delete-group-button"
                  onClick={() => handleDeleteGroup(group.group_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default Display_Group;