// routes/users.router.js
const express = require('express');

// 라우터 미들웨어를 씀
const router = express.Router();
const authenticateToken = require('../middleware/authenticate-middleware')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "ssac";

// 데이터베이스 접속하기 위해서 사용(11줄) 
const prisma = require('../utils/prisma/index')
const { body, validationResult } = require('express-validator');
const { handleValidationResult, signUpValidator, loginValidator } = require('../middleware/validation-result-handler');
// const {signUp} = require('../controllers/auth.controllers')
// const bcrypt = require('bcrypt');는 3시내용
const bcrypt = require('bcrypt');
const authControllers = require('../controllers/auth.controllers');

// 6월16일 3시
 router.post('/sign-up', 
  signUpValidator, 
  handleValidationResult, 
  authControllers.signUp,
  async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    // 이메일 중복이 있는지 확인 -> findunique
    const user = await prisma.users.findFirst({
      where: { email }
    })

    if (user) {
      return next(new Error("ExistEmail"));

    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
 
    const bcryptPassword = await bcrypt.hash(
      password,
      salt
    )
    // 데이터 베이스 저장
    const newUser = await prisma.users.create({
      data: {
        email,
        password: bcryptPassword,
        name
      }
    })
    return res.status(201).json({ msg: "가입 되었습니다!" })
  } catch (error) {
    return next(new Error("DatabaseError"));
  }
})


router.post('/login', handleValidationResult, loginValidator, async (req, res, next) => {
  //1.이메일, 이름 ,비밀번호 입력 여부 확인
  const { email, password, name } = req.body;
  // 2.이메일에 해당하는 사용자 찾기 -> 성공
  console.log(email);

  const user = await prisma.users.findFirst({
    where: { email }
  })

  // 3.사용자 존재 여부 확인
  if (!user) {
    // 유저가 없는 경우
    return next(new Error("UserNotFound"));
  }

  // 유저가 있는 경우
  // 4.비밀번호 일치 여부 확인 

  // 4시내용
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    return next(new Error("PasswordError"));
  }

  //jwt.sign(데이터, 시크릿키, 옵션)
  // 5.jwt 토큰 발급
  const token = jwt.sign({
    userId: user.userId
  }, SECRET_KEY, {
    expiresIn: "12h"
  })

  //6.생성된 데이터 전달!
  return res.status(200).send({ token })
})




// router.get('/user', authenticateToken, (req, res, next) => {
//   return res.send("q")
//   //next(new Error("ExistEmail"))
// })

module.exports = router;