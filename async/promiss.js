// promiss는 자바스크립트 안에 내장되어 있는 객체
// aysnchronous operation
// promiss 두가지 포인
// 1.state-> 프로세스가 헤비한 오퍼레이션을 수행 중인가? 아님 기능 수행이 다 완료해서 성공 또는 실패 했는지
// 2.producing, consumer 차이 알기 = 정보 제공, 정보를  소비하는 것을 이해 목표

//state: pending -> fulfilled or rejected = 만족 또는 불만족
// Producer vs Consumer

// 1.Producer
// 새로운 promise가 만들어 질 때는 excutor 함수가 자동적으로 수행한다.
// 지금 예제는 수행 했을때 2초후에 해당 조건에 맞으면 성공
// 실패하면 넷워크를 찾을 수 없다고 한다.
// 조건이 해당하면 promise의 객체를 사용해 조건 값을 가져오고 불필요한 에러가 나면 에러 또는 파이널가 나온다.
const promise = new Promise((resolve, reject) => {
    // 조금 헤비한 일을 한다 -> 네트워크에서 데이터 받기, 파일를 읽어온다 -> 시간이 오래거림 -> 비동기적으로 처리
    // promise를 생성한 순간 -> 우리가 전달한 excute 함수가 전달 -> 실행
    console.log('doing something...');
    setTimeout(() => {
        //resolve('success');
        reject(new Error('no network')) 
    }, 2000);
});

//2. Consumer : then , catch ,finally를 통해서 값을 얻어 올 수 있다
// promise의 resolve를 가져옴
// then은 성공적인걸 가져옴
// 실패를 가져오고 싶으면 catch를 가져와서 사용
promise.
    then((value) => {
    console.log(value);
})
.catch(error => {
    console.log(error);
})
.finally(() => console.log('finally'));

// 3.Promise chanining
// 1.성공하면 1초후에 1을 받아오는 promise를 가져옴
// 2.해당객체의 얻은 값을 대입하여 새로운 promise를 가져옴 
// 3.새로운 promise에 앞에 연산된 값을 대입후 1초후에 결과 출력
const fetchNumber = new Promise((resolve, reject) =>{
    setTimeout(() => resolve(1), 1000)
});

fetchNumber
.then(num => num*2)
.then(num => num*3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num - 1), 1000)
    });
})
.then(num => console.log(num));