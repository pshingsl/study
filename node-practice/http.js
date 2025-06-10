// http 모듈을 불러와 http 변수에 할당
// require('파일 경로') : Node.js 내장 모듈 불러오기
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

// server.listen(8080): 8080 포트에서 서버 실행 대기
//서버가 실행되면 콘솔에 메시지 출력
server.listen(8080, function(){
    console.log('8080번 실행');
} );

// 모듈 생성 -> 서버를 생성 후 안에서 동작하는 메서드 선언 -> 서버를 실행 시키는 함수 선언 후 실행