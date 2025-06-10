// express 모듈을 불러와 express 변수에 할당
const express = require('express')

// express 함수를 실행해서 웹 서버 앱 객체(app)를 생성
const app = express()

// port 번호 3000지정 보통 개발용으로 자주 사용
const port = 3000;

// 뷰 엔진(템플릿 엔진)을 ejs로 설정
// ejs는 HTML에 JavaScript 코드를 넣을 수 있게 해주는 도구
app.set("view engine", "ejs");

// 뷰 파일(ejs 파일)이 들어 있는 폴더 위치를 './views'로 설정
// 예: views/test.ejs
app.set("views", "./views");


// 루트 경로('/')로 GET 요청이 들어왔을 때 "Hello Express" 응답
// app.get(경로, 콜백함수(req, res)) 형식으로 정의
app.get("/", (req, res) => {
    res.send("Hello Express");
});

// 주의점 Express는 호출할 때 내부적으로 정해진 순서 (req, res)로 인자를 받는다 두 개의 위치는 바뀌면 에러남
// 오류 발생 (req.send is not a function)
// '/dog' 경로로 GET 요청 시 JSON 형태의 데이터 응답
app.get('/dog', (req, res) => {
  res.send({ sound: '멍멍' }); // 객체를 보내면 자동으로 JSON 처리됨
});
  
// '/cat' 경로로 GET 요청 시 문자열 응답
app.get('/cat', (req, res) => res.send('sound: 냥냥'))


// '/test' 경로로 요청이 들어왔을 때
// 요청 경로에 변하는 값이 들어갈 경우 :id 처럼 콜론(:)을 붙여 표현
// 예: /user/홍길동 -> req.params.id === '홍길동'
app.get('/test', (req, res) => {
  res.render('test')
});

// params Get방식 중 하나
// user 뒤에 id를 받아서 처리 받을 데이터 앞에 ':'사용
// 특정 값을 받아서 처리를 해야한다 -> 어떻게 하지? -> 저장하고 사용해야하니까 변수 사용
app.get('/user/:id', (req, res) => {
  // const p = req.params;
  // console.log(p.id);

  
  // Query 방식 - URL에 ?id=apple 형식으로 들어오는 데이터
  // 예: /user/123?id=apple -> req.query.id === 'apple'
  const q = req.query;
  console.log(q);

  // 응답으로 JSON 형태 데이터 전달
  res.json({'userid': q.id})
})




// 3000번 포트에서 서버 실행
// 실행되면 콘솔에 메시지를 출력
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//라우팅에 한글 주소를 넣고 싶으면 URL Decoder/Encoder 사이트 들어가서 변환해서 넣으면됨