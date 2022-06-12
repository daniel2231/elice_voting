const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const User = require("../models/user");


router.use(express.static("public"));

router.post("/:id/vote", async (req, res) => {
  const voteUser = await User.findOne({ githubID: req.user.githubID });
  const service = await Service.findOne({ id: req.body.id });
  console.log(voteUser);

  if (voteUser.votefor === service.id) {
    res.status(400).json({ message: "이미 추천하셨습니다." });
  } else {
    // 추천한 서비스를 추가하고 추천수를 증가시킨다.
    voteUser.isvote = true;
    voteUser.votefor = service.id;
    await voteUser.save();
    service.votes++;
    await service.save();
    res.status(200).json({ message: "추천되었습니다." });
  }
});
module.exports = router;
