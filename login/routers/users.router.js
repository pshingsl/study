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


// 1시 수업 내용

//  router.post('/sign-up',  async(req, res, next) => {
// const {email, password, name} = req.body
//  if(!email || !password || !name){
//   return next(new Error("InputValidation"));
//  }

//  // 비밀번호 6글자 이상인지 확인
//  if(password.length < 6){
//   return next(new Error("PasswordInputValidation"));
//  }

//   try{
//   // 이메일 중복이 있는지 확인 -> findunique
//   const user = await prisma.users.findFirst({
//     where: {email}
//   })

//   if(user){
//     return next(new Error("ExistEmail"));

//   }
//   // 데이터 베이스 저장
//   const newUser = await prisma.users.create({
//     data: {
//       email,
//       password,
//       name
//     }
//   })
//   return res.status(201).json({msg: "가입 되었습니다!"})
//    }catch(error){
//     return next(new Error("DatabaseError"));
// }
//  })

//2시 수업 내용 Validator 15~26 정의  51, 65~97
// const signUpValidator = [
//   // 이메일 검증
//   body('email')
//   .isEmail().withMessage('이메일 형식이 아닙니다.')
//   .notEmpty().withMessage('이메일 없습니다.'),
//     //패스워드 검증
//   body('password')
//   .isLength({min : 6}).withMessage('비밀번호가 6자 이하.')
//   .notEmpty().withMessage('비밀번호가 없습니다.'),
//   body('name')
//   .notEmpty().withMessage('이름이 없습니다.')
// ]
const { handleValidationResult, signUpValidator, loginValidator } = require('../middleware/validation-result-handler');
// router.post('/sign-up',  signUpValidator, handleValidationResult, async(req, res, next) => {
// const {email, password, name} = req.body;
// //   const result = validationResult(req).error;
// //  // result 비어있다면
// //  if(result.length !== 0){
// //   // 입력 오류가 있는경우
// //   const extracteError = result.array.map(err => err.msg);
// //   return next(new Error("InputValidation"))
// //  }

//   try{
//   // 이메일 중복이 있는지 확인 -> findunique
//   const user = await prisma.users.findFirst({
//     where: {email}
//   })

//   if(user){
//     return next(new Error("ExistEmail"));

//   }
//   // 데이터 베이스 저장
//   const newUser = await prisma.users.create({
//     data: {
//       email,
//       password,
//       name
//     }
//   })
//   return res.status(201).json({msg: "가입 되었습니다!"})
//    }catch(error){
//     return next(new Error("DatabaseError"));
// }
// })

/* 3시수업 로그인 API 순서도 그리기
 1.이메일, 이름 ,비밀번호 입력 여부 확인
 2.이메일에 해당하는 사용자 찾기
 3.사용자 존재 여부 확인
 4.비밀번호 일치 여부 확인 
 5.jwt 토큰 발급
 6.생성된 데이터 전달!
 7.로그인 끝
*/
// router.post('/login',handleValidationResult,  loginValidator, async(req, res, next) =>{
//   //1.이메일, 이름 ,비밀번호 입력 여부 확인
//   const {email, password, name} = req.body;
//   // 2.이메일에 해당하는 사용자 찾기 -> 성공
//   console.log(email);

//   const user = await prisma.users.findFirst({
//     where:{email}
//   })

//   // 3.사용자 존재 여부 확인
//   if(!user){
//     // 유저가 없는 경우
//     return next(new Error("UserNotFound"));
//   }

//   // 유저가 있는 경우
//   // 4.비밀번호 일치 여부 확인 
//   if(password !== user.password){
//      return next(new Error("PasswordError"));
//   }
//   //jwt.sign(데이터, 시크릿키, 옵션)
//   // 5.jwt 토큰 발급
//   const token = jwt.sign({
//     userId: user.userId
//   }, SECRET_KEY, {
//     expiresIn: "12h"
//   })

//   //6.생성된 데이터 전달!
//   return res.status(200).send({token})
// })

// const bcrypt = require('bcrypt');는 3시내용
const bcrypt = require('bcrypt')


//4시 147 ~ 217 비밀번호 암호화 한거 로그인 하기
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

router.post('/sign-up', signUpValidator, handleValidationResult, async (req, res, next) => {
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
    console.log('salt:', salt);
    const bcryptPassword = await bcrypt.hash(
      password,
      salt
    )
    console.log(bcryptPassword)
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


/* router.get('/login', (req, res, next) =>{
  // 원래는 데이터베이스에서 받아와야하는데 임시로 만들어옴
  // user라는 payload를 만듬
  // payload: 유저의 정보를 담을 데이터 -> 데이터베이스
  const user = {
    id:1, 
    username:"박상혁",
    role:"user"
  }

  // jwt.sign: 토큰 생성
  const token = jwt.sign(user, SECRET_KEY, {
    // expiresIn 만료시간을 설정(h, m, s)
    expiresIn: '10m'
  });
  console.log(token)

  return res.json({
    token
  })
})
*/



router.get('/user', authenticateToken, (req, res, next) => {
  console.log(req.user)
  return res.send("q")
  //next(new Error("ExistEmail"))
})

module.exports = router;