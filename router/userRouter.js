const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.use(express.static("public"));

//로그인 창 
router.get("/", async (req, res)=>{
    const users = await User.find({}).exec();
    res.render('users/login');
});

//회원가입 창
router.get("/new-user", async (req, res)=>{
    const users = await User.find({}).exec();
    res.render('users/signup');
})


// 회원가입 전송
router.post('/new-user/submit', body('email').isEmail().withMessage('not email'), body('password').isLength({ min:5 }).withMessage('longer than 5'), async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return response.status(400).json({
            errors: errors.array()
      })
    }

    const { name, email, password } = req.body;
    const findResult = await User.findOne({email:email});
    if (findResult){
        res.status(401).write("<script>alert('Email already exists.')</script>");
        res.write("<script>window.location=\"/\"</script>");
      return;
    };

    const salt = bcrypt.genSaltSync(10);
    const bcryptpw = bcrypt.hashSync(password, salt);
    User.create({
        name: name,
        email: email,
        password: bcryptpw
    })
    .then(result => {
        res.status(200).render('services/service');
    })
});


// 로그인
router.post('/login', async (req, res)=>{
    const { email, password }  = req.body;
    const user = await User.findOne({email:email}).exec();
    if (!user){
        return res.status(401).json({msg: '가입되지 않은 계정입니다.'});
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
        res.status(401).json({msg: '비밀번호가 일치하지 않습니다.'});
        return;
    };
    res.status(200).render('services/service');
    return;

});

// 로그아웃
router.delete('/logout', async (req, res)=>{


});

module.exports = router;