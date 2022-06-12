const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 연결해둔 mongoDB 내 User에서 검색
  
        let user = await User.findOne({ githubID: profile.id });
        // User에 없으면 추가로 저장
        if (!user) {
          user = new User({
            name: profile.username,
            githubID: profile.id,
          }).save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
