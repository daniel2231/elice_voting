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
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// 라우터 설정
const indexRouter = require("./router/indexRouter");
const userRouter = require('./router/userRouter');
const serviceRouter = require('./router/serviceRouter');

// indexRouter에서 라우팅 설정
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/services", serviceRouter);


// Port 설정
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
