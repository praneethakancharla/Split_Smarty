//login_Page.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

function Login_Page() {
  const [data, setData] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const togglePasswordVisibility = () => {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      document.querySelector("button").textContent = "Hide Password";
    } else {
      passwordField.type = "password";
      document.querySelector("button").textContent = "Show Password";
    }
  };
  const handleButtonClick = async () => {
    try {
      console.log(email);
      console.log(password);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      // Assuming your backend returns a token upon successful login
      const { token, userID } = response.data;
      localStorage.setItem("token", token);
      // Save userID to local storage
      localStorage.setItem("userID", userID);

      // Save token to local storage or session storage or cookies
      localStorage.setItem("token", token);
      alert("Logged in Successfully");
      // Redirect to user page upon successful login
      navigate("/User_Page");
    } catch (error) {
      setError("Sign-in failed. Please try again.");
    }
  };

  return (
    <div style={{ marginLeft: "18%", marginTop: "10%" }} className="Login_Page">
      <br />
      <p>
        {" "}
        <span
          className="page-head-2"
          style={{ marginLeft: "22%", fontSize: "80px" }}
        >
          Split Smarty
        </span>
      </p>
      <br />
      <br />
      <br />

      <span className="page-head-1">WELCOME BACK!</span>
      <br />
      <br />
      <span className="page-head-3">
        Don't have an account,
        <Link to="/Create_Acc">
          <button
            id="sign-up-2"
            style={{
              color: "#000f73",
              marginLeft: "0.0625rem",
              padding: "0.0625rem 0.0625rem",
            }}
          >
            Sign Up
          </button>
        </Link>
      </span>
      <br />
      <br />
      <span
        style={{
          fontSize: "1.2rem",
          fontFamily: "Overpass, Arial, sans-serif",
          color: "#444b59",
          marginLeft: "23.5rem",
        }}
      >
        Email Address
      </span>
      <br />
      <br />
      <input
        type="text"
        className="input-text"
        placeholder="you email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <span
        style={{
          fontSize: "1.2rem",
          fontFamily: "Overpass, Arial, sans-serif",
          color: "#444b59",
          marginLeft: "23.5rem",
        }}
      >
        Password
      </span>
      <br />
      <br />
      <input
        type="password"
        className="input-text"
        id="password"
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button
        onClick={handleButtonClick}
        id="sign-in"
        type="submit"
        className="universal-button"
        style={{ marginLeft: "30%" }}
      >
        Sign In
      </button>
      <br />
      <br />
      {error && (
        <div style={{ marginLeft: "29%" }} className="error">
          {error}
        </div>
      )}
    </div>
  );
}

export default Login_Page;
