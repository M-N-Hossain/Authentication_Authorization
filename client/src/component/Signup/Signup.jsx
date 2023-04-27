import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function registerSubmitHandler(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8080/signup", values)
      .then((result) => {
        if (result.data.Status === "Success") {
          navigate("/login");
        } else {
          alert("You have account with this email or username ");
        }
      })
      .then((err) => console.log(err));
  }

  return (
    <div>
      <form className="signupForm" onSubmit={registerSubmitHandler}>
        <div className="divInsideForm">
          <h2>Sign Up</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
          <br />
          <button className="signup-btn">Signup</button>
          <Link to="/login">
            <button className="signup-btn">Log in </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
