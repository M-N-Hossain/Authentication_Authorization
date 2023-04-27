import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMassage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((result) => {
        if (result.data.Status === "Success") {
          setName(result.data.username);
          setAuth(true);
        } else {
          setAuth(false);
          setMassage(result.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  function logoutBtnHandler() {
    axios
      .get("http://localhost:8080/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .then((err) => console.log(err));
  }

  return (
    <div>
      {auth ? (
        <div className="div">
          <h3>You are authorized--- {} </h3>
          <button className="btn" onClick={logoutBtnHandler}>
            Logout
          </button>
        </div>
      ) : (
        <div className="div">
          <h3> {message} </h3>
          <h4>Login now ----</h4>
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}
