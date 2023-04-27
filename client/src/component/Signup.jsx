import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      <form onSubmit={registerSubmitHandler}>
        <label>Email</label> <br />
        <input
          type="email"
          name="email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          required
        />
        <br />
        <label>Username</label> <br />
        <input
          type="text"
          name="username"
          onChange={(e) => setValues({ ...values, username: e.target.value })}
          required
        />
        <br />
        <label>Password</label> <br />
        <input
          type="password"
          name="password"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          required
        />
        <br />
        <input type="submit" value="Signup" />
        <Link to="/login"> Log in </Link>
      </form>
    </div>
  );
}
