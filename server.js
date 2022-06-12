// express js server
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { MONGO_URI, PORT } = process.env;
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors({ origin: '*' }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/pages");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session 정보 설정
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

require("./controllers/authController");

// 초기화. user정보가 req.user로 들어가게 됨
app.use(passport.initialize());
// passport 내에서 session을 사용해 로그인을 지속시킴
app.use(passport.session());

// 라우터 설정
const indexRouter = require("./router/indexRouter");
const serviceRouter = require("./router/serviceRouter");

// indexRouter에서 라우팅 설정
app.use("/", indexRouter);
app.use("/services", serviceRouter);

// Port 설정
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
