//Create_Group.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Create_Group() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [groupData, setGroupData] = useState({
    group_describe: "",
    name: ""
  });
  const handleCreateGroup = async (event) => {
    event.preventDefault();
    try {
      const createGroupResponse = await axios.post(
        `http://localhost:5000/api/sg/createSplitGroup/${userID}`, 
        groupData
      );
  
      if (createGroupResponse.status === 201) {
        alert("Group Created Successfully");
        navigate("/User_Page");
      } else {
        console.error("Failed to create group:", createGroupResponse.statusText);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
  
  return (
    <div className="Create_Group">
      <p>
        {" "}
        <span className="page-head-2">User Profile</span>
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleCreateGroup}>
        <div>
          <label htmlFor="name" className="normal-info" style={{marginLeft: '12rem', marginRight: '-10rem'}}>
            Enter Group Name{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="your group name"
            onChange={(e) =>
              setGroupData({ ...groupData, name: e.target.value })
            }
          ></input>
          <br />
          <br />
        </div>
        <div>
          <label htmlFor="group_describe" className="normal-info" style={{marginLeft: '12rem', marginRight: '-13.5rem'}}>
            Enter Group Description{" "}
          </label>
          <input
            type="text"
            name="group_describe"
            placeholder="your group description"
            onChange={(e) =>
              setGroupData({ ...groupData, group_describe: e.target.value })
            }
          ></input>
          <br />
          <br />
        </div>
        <button
          type="submit"
          id="sign-in"
          className="universal-button"
          style={{ marginLeft: "27.5rem", marginRight: "5rem" }}
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default Create_Group;
