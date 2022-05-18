const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github").Strategy;
// const User = require("../models/User");

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // 만약 이미 같은 계정이 있다면 그대로 반환
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
          return done(err, user);
      });
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
