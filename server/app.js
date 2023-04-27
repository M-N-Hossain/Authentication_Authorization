import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import authenticationRouter from "./routers/userAuthenticationRouter.js";
import authorizationRouter from "./routers/userAuthorizationRouter.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["Post", "Get"],
    credentials: true,
  })
);
app.use(cookieParser());

// Using router
app.use(authenticationRouter);
app.use(authorizationRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
