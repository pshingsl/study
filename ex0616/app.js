// app.js

// import UsersRouter from './routers/users.router.js'
// import PostsRouter from './routers/posts.router.js'; // Post 라우터 불러오기

const express = require('express');
const userRouter = require('./routers/users.router')
const postsRouter = require('./routers/posts.router');
// 
const cookieParser = require('cookie-parser')
//session
// const session = require('express-session')
// const FileStore = require('session-file-store')(session);

const errorHandingMiddleware = require('./middleware/error-handing-middleware')

var fileStoreOption = {
  reverse:false,
  cookie:{}
  
};
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//   //resave: true로 할때마다 새로 뭔가함
//   resave:false,
//   //cookie: 보완 관련된 거
//   cookie:{
//     httpOnly: true
//   },
//   saveUninitialized: true,
//   secret:"sesac",
//   store: new FileStore()
// }));


app.use('/', [userRouter, postsRouter]); // 배열로 여러 라우터 연결

app.use(errorHandingMiddleware);
//오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
  console.log(`${PORT}, 포트로 서버가 열렸어요!`);
});