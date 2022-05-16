// express js server
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/pages");

// 라우터 설정

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
