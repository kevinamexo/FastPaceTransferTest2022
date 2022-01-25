// const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mysql = require("mysql");
const db = require("./db.js");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/login", authRoutes);

app.listen(8000, () => {
  console.log("Server running locally on port 8000");
});
