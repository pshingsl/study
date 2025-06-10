// 전개구문(spread)
// 반복 가능한 객체에 사용하는 문법 -> 배열, 유사 배열, 문자열 등에 사용가능const a= [1,2,3];
// 객체의 요소에 접근해서 요소들을 하나씩 분리해서 전개요소에 접근해서 반환
// ... 연산자 사용
const a= [1,2,3];
const b= [4,5];

//...연산자를 사용해서 두 배열을 하나씩 분리해서 합쳐졌다
const spread = [...a, ...b];
console.log(spread);

// rest파라미터
// 호출 받는 함수의 파라미터에 사용
// 호출하는 함수의 파라미터 순서에 맞춰 값 설정 후 남은 파라미터 값을 배열로 선정
const values = [10,20,30];
function get(a, ...rest){
    console.log(rest);
}
get(...values);