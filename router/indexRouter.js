const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");

//모델 연동
// const Service = require("../models/Service");

// 라우터 설정 
router.get("/", (req, res) => {
  res.render("index");
});

// 로그인 되어 있는지 확인
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

// // 모델 연동 후
// router.get('/', isAuthenticated, async (req, res, next) => {
//   try {
//     const services = await Services.find();
//     res.render('index', { services });
//   } catch(err) {
//     next(err);
//   }
// });

// // github 로그인(인증)페이지로 이동
// router.post("/login", passport.authenticate("github"));

// // 인증처리 후 github에서 콜백해준 url
// router.get(
//   "/login/callback",
//   passport.authenticate(
//     "github",
//     // 실패 시 로그인페이지로 다시 이동
//     { failureRedirect: "/login" }
//   ),
//   // 성공 시 home으로 이동
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// app.post("/logout", function (req, res, next) {
//   req.session.destroy(() => {
//     req.session;
//   });
//   res.redirect("/login");
// });

module.exports = router;
