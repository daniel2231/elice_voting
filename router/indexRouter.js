const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


// 서비스 정보, 유저 정보
//
router.get("/", async (req, res) => {
  res.render('index');
  
});



module.exports = router;