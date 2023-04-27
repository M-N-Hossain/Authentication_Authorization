import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbCnnection from "../database/mysqlConnection.js";
import nodemailer from "nodemailer";

const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hh0381915@gmail.com",
    pass: "hossain1234",
  },
});

const mailOptions = {
  from: "hh0381915@gmail.com",
  to: "",
  subject: "account creation notification",
  text: `You have a created a acount with SOME`,
};

// SignUp post method with bcrypt which encrypt the password and save a new user to the database

router.post("/signup", async (req, res) => {
  // SQL Query
  const sql = "INSERT INTO user (`email`,`username`,`password`) VALUES (?)";

  bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
    if (err) return res.send({ Error: "Error in pasword hashing" });

    const values = [req.body.email, req.body.username, hashedPassword];
    dbCnnection.query(sql, [values], (err, data) => {
      if (err) return res.send({ Error: "Error in SQL execution" });
      mailOptions.to = req.body.email;
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err);
        return console.log("Message sent to " + mailOptions.to);
      });
      return res.send({ Status: "Success" });
    });
  });
});

// Login post method which authenticate the person from the database and create the token for authorization

router.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE username = ?";

  dbCnnection.query(sql, [req.body.username], (err, data) => {
    if (err) return res.send({ Error: "Login sql exuection errror" });
    else if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, response) => {
        if (err) return res.send({ Error: "Password hash compare errror" });
        if (response) {
          // Generating jwt token and encode the username
          const username = data[0].username;
          const jwToken = jwt.sign({ username }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1d",
          });
          // sending token cookie
          res.cookie("token", jwToken);
          return res.send({ Status: "Success" });
        } else {
          return res.send({ Error: "Password does not matched" });
        }
      });
    } else {
      return res.send({ Error: "username is not existed" });
    }
  });
});

export default router;
