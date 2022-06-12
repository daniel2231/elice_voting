const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  githubID: {
    type: String,
    required: true,
  },
  votefor: {
    type: Number,
    default: null,
  },
  isvote: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
