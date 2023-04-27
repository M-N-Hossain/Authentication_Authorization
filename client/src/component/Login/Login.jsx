import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

// For showing the notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  function loginSubmitHandler(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8080/login", values)
      .then((result) => {
        if (result.data.Status === "Success") {
          navigate("/");
        } else {
          toast(result.data.Error, {closeOnClick: true,});
        }
      })
      .then((err) => console.log(err));
  }

  return (
    <div>
      <form className="loginForm" onSubmit={loginSubmitHandler}>
        <div className="divInsideForm">
          <h2>Login--{">>"}</h2>
          <input
            type="text"
            name="username"
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
          <br />
          <button className="login-btn" type="submit">
            Log in
          </button>
          <Link to="/signup">
            <button className="login-btn">Sign Up</button>
          </Link>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}
