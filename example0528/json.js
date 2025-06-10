const car = `{
  "model": "IONIQ 5",
  "company": "HYUNDAI",
  "price": 50000000,
  "year": 2023,
  "isElectricCar": true,
  "options": ["side mirror", "smart sensor", "built-in cam"]
}`;
console.log(car); // format: JSON

//역직렬화 : JSON.parse() -> 통신하여 받은 데이터를 객체를 변환
//json to js obj
const obj = JSON.parse(car);
console.log(obj);
console.log();

// obj변수는 js object이므로 .(dot)/[] 연산자를 이용해 키 값에 접근가능
console.log(obj.model);
console.log(obj.price);
console.log(obj.hello);

// 직렬화:JSON.stringify() -> 통신하기 쉬운 포맷(JSON)으로변환
// js obj to jsone
const json = JSON.stringify(obj);
console.log(json, typeof json);

// json변수는 JSON 형태의 "문자열(string)" 이므로
// (dot)/[]/[] 연산자를 이용해 키 값에 접근불가능
// js에서 JSON은 긴 문자열로 취급 -> 객체로 바꿔서 처리
console.log(json.split(""));
console.log(json.toUpperCase());