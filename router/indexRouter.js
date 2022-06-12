const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
const Service = require("../models/service");
const User = require("../models/user");
const getRank = require("../controllers/getRank");

// 로그인 되어 있는지 확인
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(301).redirect("/login");
  }
};

// 모델 연동 후
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const services = await Service.find({});
    const user = await User.findOne({ githubID: req.user.githubID });
    let result;
    await Service.find({})
      .then((d) =>
        d.sort((a, b) => {
          if (a.votes > b.votes) {
            return -1;
          }

          if (a.votes < b.votes) {
            return 1;
          }

          return 0;
        })
      )
      .then((e) => {
        //득표수로 랭킹. 동점인 경우 차순위는 스킵없이 이어서
        const votes = e.map((d) => d.votes);
        let ranking = [1, 0, 0, 0, 0, 0];
        for (let i = 1; i < votes.length; i++) {
          if (votes[i] === votes[i - 1]) {
            ranking[i] = ranking[i - 1];
          } else {
            ranking[i] = ranking[i - 1] + 1;
          }
        }

        for (let j = 0; j < ranking.length; j++) {
          e[j].rank = ranking[j];
        }
        return e;
      })
      .then((res) => {
        result = res;
      });

    res.render("index", { services: result, user: user });
  } catch (err) {
    res.redirect("/login");
  }
});

router.get("/login", (req, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    next(err);
  }
});

// github 로그인(인증)페이지로 이동
router.post("/login/github", passport.authenticate("github"));

// 인증처리 후 github에서 콜백해준 url
router.get(
  "/login/github/callback",
  passport.authenticate(
    "github",
    // 실패 시 로그인페이지로 다시 이동
    { failureRedirect: "/login" }
  ),
  // 성공 시 home으로 이동
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/logout", function (req, res, next) {
  req.session.destroy(() => {
    req.session;
  });
  res.redirect("/login");
});

module.exports = router;
