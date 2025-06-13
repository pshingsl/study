const express = require("express");
const userRouter = require("./routes/users.router")
const cookieParser = require("cookie-parser");
const errorHandlingMiddleware = require("./middleware/error-handling-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);

// 오류 처리 미들웨어
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, `포트로 서버가 열림`);
});