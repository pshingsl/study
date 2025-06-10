const express = require('express');
const app = express();

const aRouter = require('./a')
const port = 3000;

// app.set("view engine", "ejs");
// app.use('/views', express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//530
app.use("/a", aRouter);
app.get("/", (req, res) => {
  res.send("app"); // 파일명으로 가져와야한다.
});

// app.use("/aa", aRouter);
// app.get("/", (req, res) => {
//   res.send("app"); // 파일명으로 가져와야한다.
// });

//13 ~ 22 hompage url 다르게 쓰는 이유 충돌을 방지하기 위해서

app.listen(port, () =>{
  console.log(`${port} 3000`)
})