// express모듈 사용방법 1. 모듈 불러오기 -> 2 express 함수를 실행해서 웹 서버 앱 객체(app)를 생성 -> 3. 포트번호 지정하기
const express = require('express');
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
console.log( __dirname)
app.use('/views', express.static(__dirname + "/views"));
app.use("/public", express.static(__dirname + "/public"));
//static 정적이라고 해서 이 파일에 지정한 곳엣는 동적인 js넣으면 안됨

// Post 방식을 할때 12~13 사용해야한다.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  console.log(__dirname)
  res.render("form",{title:'실습'}); // 파일명으로 가져와야한다.
});

app.get("/getForm", (req, res) => {
  console.log(req.query);
  res.render('getresult', {
    title: 'check',
    userInfo: req.query, 
  });
});

app.post("/postForm", (req, res) => {
 console.log(req.body); 
 res.render('postresult', {
    title: 'postCheck',
    userInfo: req.body,
  })
});


app.listen(PORT, () => console.log(`http://localhost: ${PORT}`));

function fetchFruits(){
  return new Promise(function (resolve, reject){
    setTimeout(function(){
       const fruits = ["사과", "레몬", "수박"];
        resolve(fruits);
    }, 1000)
  })
}

fetchFruits()
.then(function (f){
  console.log(f);
})
.catch(function (error){
  console.log(err);
})
