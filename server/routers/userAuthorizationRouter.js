import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Middleware function to authorize the user with the token that creats by login
function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.send({ Error: "You are not authorized here!!!" });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) return res.send({ Error: "Tokent is not matched" });
      //  decode the username that was encoded in jwToken
      req.username = decoded.username;
      next();
    });
  }
}

router.get("/", verifyUser, (req, res) => {
  res.send({ Status: "Success" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.send({ Status: "Success" });
});

export default router;
