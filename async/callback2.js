// JS는 기본적으로 동기적이다: 코드가 작성된 순서대로 하나씩 실행된다.
// 호이스팅: var, function 선언들이 코드의 맨 위로 올라가는 것
// 이 둘은 다르다

// a synchronos는 비동기적이다
// 비동기(Asynchronous) 함수는 실행을 예약하고, 바로 다음 코드로 넘어간다.
// 예시로는 setTimeout()-> 지정한 시간이 지나면 콜백함수를 호출하는것
// 정확히 언제 실행되는지는 이벤트 루프에 의해 결정된다 (메인 코드가 끝난 후).
// setTimeout() = 브라우저 API -> 브라우저에서 먼저 요청을 한다.
// 콜백함수:우리가 전달한 함수를 나중에 불러줘

console.log('1');
setTimeout(() => console.log('2'), 1000);
console.log('3');
// 처음에 1출력 -> 함수 이동 조건 보니까 브라우저에서 1초후 실행
// 출력: 1 → hello → 3

// callback은 비동기일때만 쓰는가? -> 아니다-> 두 가지의 경우가 있다
// Synchronos callback
function printImmediately(print){
    print();
}
printImmediately(() =>  console.log('hello'));
// 출력시 13 -> printImmediately() 수행 -> 2 왜 이렇게 됨?
// 1. 함수가 호이스팅이 된다  2.setTimeout()이 브라우저에 요청을 함
//따라서 printImmediately는 콜백을 즉시 실행하는 동기적 함수이다

/*
function printImmediately(print){
    print();
}
printImmediately(() =>  console.log('hello'));

console.log('1');
setTimeout(() => console.log('2'), 1000);
console.log('3');
이렇게 나옴*/

// Asynchronos callback
function printDelay(print, timeout){
    setTimeout(print, timeout);
}
printDelay(() => console.log('async callback'), 2000);

//callback Hell example
// 유저보관소 생성 -> 로그인 시스템 구현(아이디, 비번, 성공, 실패) 
// -> 만약 성공하면 2초후에 아이디값 출력 <-> 실패면 2초후 not found 출력
// 데이터 값을 얻는 함수 선언 -> 아이디한 사람이 user이면 name, role이 출력
// 실패시 낫 파운드랑 에러가 나옴
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(() => {
            if(
                (id === 'Hyuk' && password === '1234')||
                (id === 'coder' && password === '1234')
            ){
                onSuccess(id);
            }else{
                onError(new Error('not found'));
            }
        }, 2000);
    }
    
    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if(user === 'Hyuk'){
                onSuccess({name:'Hyuk', role:'admin'});
            }else{
                onError(new Error('no access'));
            }
        }, 1000)
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  (user) => {
    // 성공 시 실행
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);

// 지금 코드를 짠건 너무 길고 복잡하다(구현 부족)
// callback 단점을 보완한 promis, async, await 