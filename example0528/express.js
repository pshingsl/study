//express() 모듈이 export하는 최상위 함수로, express application을 만듦
//app 객체 Express() 함수를 호출함으로써 만들어진 express application
// const express = require('express')
// const app = express()
// const port = 3000

// // get으로 사용 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });
// // http://localhost:3000/test으로 설정해야 원하는거 볼 수있다
// app.get("/test", (req, res)=>{
//   res.send('Bye World!')
// })
// // 포트는 하나밖에 사용하지 못함
// // 실행시 터미널 밑에 콘솔 출력
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });

// ejs template
const express = require('express');
const app = express();
const PORT = 8000;

// ejs템플릿 예제
// ./views에 사용 폴더 만들면 됨
app.set("view engine", "ejs");
app.set("views", "./views"); // 폴더위치를 확인 잘해야 한다.

app.get("/", (req, res) => {
  res.send("Hello Express");
});

// http://localhost:8000/test 이동해야한다
app.get("/test", (req, res) => {
  res.render("test"); // 파일명으로 가져와야한다.
});

app.listen(PORT, () => console.log(`http://localhost: ${PORT}`));

// 미들웨어는 express의 핵심
// 미들웨어 에제
app.set("view engine", "ejs");
console.log(__dirname, "/views")

//use은 express에게 어떤 경로(라이브러리, 경로 등등 여러가지)를 사용하겠다고 지정
app.use('/views', express.static(__dirname + '/views'));
//app.use('/views')로 해야하고, aexpress.static(__dirname + '/views')뒤 폴더명 바꿔야한다.
app.use("/public", express.static(__dirname + "/public"));
// ;public폴더를 만들어줘야함 -> express가 public 폴더를 찾기 시작

/*.get은 미들웨어 기능이 적용되는 HTTP 메서드
 '/'은 미들웨어 기능 적용되는 경로(route)
 function은 미들웨어 기능
 req는 "next"라고 불리는 미들웨어 함수에 대한 콜백인수
 res는 "res"라고 불리는 미들웨어 함수에 대한 HTTP 응답 인수입니다.
 next는 "req"라고 불리는 미들웨어 함수에 대한 HTTP 요청 인수입니다.
*/

// 백엔드 면접 질문으로 미들웨어 물어봄 기능 등등
app.get("/", (req, res) => {
  res.send("Hello Express");
});


app.get("/test", (req, res) => {
  res.render("test"); // 파일명으로 가져와야한다.
});

app.get("/test/test2", (req, res) => {
  res.send("Hello test")
})


const c = [..."Hello"];
console.log(c)

