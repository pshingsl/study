// express 모듈을 불러와서 웹 서버 기능을 사용 가능하게 함
const express = require('express')

// express 앱 객체 생성
const app = express()

// 사용할 포트 번호 3000으로 설정(보통 개발용으로 사용함)
const port = 3000;

//템플릿 엔진 ejs로 설정
app.set("view engine", "ejs");

// EJS 템플릿 파일이 들어 있는 폴더 위치를 './views'로 설정
app.set("views", "./views");

//정적 파일을 브라우저에 제공
// '/views' 경로로 접근하면 views 폴더 안에 있는 파일로 받음
app.use('/views', express.static(__dirname + '/views'));

//첫 화면의 경로 '/'로 설정
// 'form.ejs' 파일을 렌더링해서 응답함
app.get('/', (req, res) => {
  res.render('form', {
    title:'실습하기'
  })
});

// [2] GET 방식으로 '/getForm' 경로로 요청이 들어오면
// 브라우저 주소창에 보낸 폼 데이터를 req.query로 받음
app.get('/getForm', (req, res) => {

 // 예: { name: '홍길동', email: 'test@test.com' }
    console.log(req.query);

// result.ejs에 파일을 렌더링하면서 받은 폼 데이터를 전달 
    res.render('result', {
        title: 'GET 요청 폼 결과 확인하기',
        userInfo: req.query,
    });
});


// [3] POST 방식으로 '/postFrom' 경로로 요청이 들어오면
// body-parser를 통해 req.body로 폼 데이터 받음
app.post('/postFrom', (req, res) => {
 // 예: { name: '홍길동', email: 'test@test.com' }
    console.log(req.body);
  
    res.render('result', {
    title: 'POST 요청 폼 결과 확인하기',
     userInfo: req.body, 
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

