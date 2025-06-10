// app.js

import express from 'express';
import UsersRouter from './routers/users.router.js'



const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', [UsersRouter]); // 배열로 여러 라우터 연결

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});