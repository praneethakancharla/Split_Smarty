//Create_Acc.js
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Create_Acc() {
  const [inputData, setInputData] = useState({
    name: "",
    password: "",
    email: "",
    upi_id: "",
    contact: "",
    self_describe: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createUserResponse = await axios.post(
        "http://localhost:5000/api/users/createUser",
        inputData
      );

      if (createUserResponse.status === 201) {
        alert("Welcome to SplitSmarty!");
        navigate("/Login_Page");
      } else {
        console.error("Failed to create user:", createUserResponse.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className="Create_Acc">
      <br />
      <p>
        {" "}
        <span className="page-head-2">Split Smarty</span>
      </p>
      <br />
      <br />
      <span className="page-head-3" style={{fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '24rem'}}>
        CREATE YOUR ACCOUNT!
      </span>
      <br />
      <br />
      <br></br>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              style={{
                fontSize: "1.2rem",
                fontFamily: "Overpass, Arial, sans-serif",
                color: "#444b59",
                marginRight: "-14rem",
                marginLeft: "18rem",
              }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="your name"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{
                fontSize: "1.2rem",
                fontFamily: "Overpass, Arial, sans-serif",
                color: "#444b59",
                marginRight: "-15.25rem",
                marginLeft: "18rem",
              }}
            >
              Email ID
            </label>
            <input
              type="text"
              name="email"
              placeholder="your email"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label
              htmlFor="contact"
              style={{
                fontSize: "1.2rem",
                fontFamily: "Overpass, Arial, sans-serif",
                color: "#444b59",
                marginRight: "-17rem",
                marginLeft: "18rem",
              }}
            >
              Contact No.
            </label>
            <input
              type="text"
              name="contact"
              placeholder="your contact no."
              onChange={(e) =>
                setInputData({ ...inputData, contact: e.target.value })
              }
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                fontSize: "1.2rem",
                fontFamily: "Overpass, Arial, sans-serif",
                color: "#444b59",
                marginRight: "-16rem",
                marginLeft: "18rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="your password"
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label
              htmlFor="upi_id"
              style={{
                fontSize: "1.2rem",
                fontFamily: "Overpass, Arial, sans-serif",
                color: "#444b59",
                marginRight: "-14.25rem",
                marginLeft: "18rem",
              }}
            >
              UPI ID
            </label>
            <input
              type="text"
              name="upi_id"
              placeholder="your UPI ID"
              onChange={(e) =>
                setInputData({ ...inputData, upi_id: e.target.value })
              }
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label
              htmlFor="self_describe"
              style={{
                fontSize: "1.2rem",
                fontFamily: "Overpass, Arial, sans-serif",
                color: "#444b59",
                marginRight: "-20rem",
                marginLeft: "18rem",
              }}
            >
              Describe Yourself
            </label>
            <input
              type="text"
              name="self_describe"
              placeholder="describe yourself"
              onChange={(e) =>
                setInputData({ ...inputData, self_describe: e.target.value })
              }
            ></input>
            <br />
            <br />
          </div>
          <button
            id="sign-in"
            className="universal-button"
            type="submit"
            style={{ marginLeft: "27rem", marginRight: "5rem" }}
          >
            Sign Up
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default Create_Acc;
