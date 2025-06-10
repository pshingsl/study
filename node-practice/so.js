// http 모듈을 불러와 http 변수에 할당 -> http라는 모듈을 생성
const http = require('http');

// server 변수 선언 후 createServer()로 서버 객체 생성
const server = http.createServer((req, res)=>{
    // 응답 상태 코드 200(성공)
    res.writeHead(200);

    //  설정, 응답 본문 <h1>Hello!
    res.write("<h1>Hello!</h1>");

    //</h1>작성, 응답 본문으로 <p>End</p> 출력하고 응답 종료
    res.end("<p>End</p>")
});

// 'request' 이벤트 리스너 등록: 요청이 들어올 때 실행
server.on('request', (req) => console.log('request 이벤트'));

// 'connection' 이벤트 리스너 등록: 클라이언트가 연결될 때 실행
server.on('connection', (socket) => console.log('connection 이벤트'));

// 8080 포트에서 서버 실행 대기
server.listen(8080, () => console.log('8080번 실행'));

// 모듈 생성 -> 서버를 생성 후 안에서 동작하는 메서드 선언 -> 이벤트 등록 -> 서버를 실행 시키는 함수 선언 후 실행