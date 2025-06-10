const { Template } = require("ejs");

// 비동기 처리를 한다 -> 함수앞에 async 키워드를붙이면 됨 
// async function f1() {
//   return 1;
// }
// async function f2() {
//   return Promise.resolve(1);
// }
// console.log("1 >> ", f1());
// f1().then(function (result) {
//   console.log("2 >> ", f2());
// })
// console.log("3 >> ", f2());
// f2().then(function (result){
//    console.log("4>> ", result);
// });
// const f3 = async () => {
//   return 3;
// }

// function fetchFruits(){
//   return new Promise(function (resolve, reject){
//     setTimeout(function(){
//        const fruits = ["사과", "레몬", "수박"];
//         resolve(fruits);
//     }, 1000)
//   })
// }

// // const temp = [];
// async function printItems() {
//   const fruits = await fetchFruits();
//   console.log(fruits);
//   return fruits;
// }
// const temp = printItems();
// console.log(temp)
// 실행하다 -> 함수호출 ->비동기 처리 -> awit를만남 실행 결과가 끝날때 까지 대기
// 밖에다 쓰기위해 printItems(); 변수로 선언 const temp = printItems(); -> console.log(temp) 바로 실행됨
// await때문에 값 출력
// async await를 쓸때 항상 함수 안에다 써야한다.
// fetch에 비해서 유지보수가 쉬움 -> 많이 쓸 예정

// fetchFruits()
// .then(function (f){
//   console.log(f); // fruitsdata
//   f.forEach(fruit => {
//     temp.push(fruit);
//     console.log(temp);
//   });
// })
// .catch(function (error){
//   console.log(error);
// })

// console.log(temp)
// 밖에다 출력하기 위해서 안에다 데이터를 저장해야한다.

let product;
let price;
function goMart(){
  console.log("마트에 가서 어떤 음료를  살지 고민한다..");
}

function pickDrink(){
  return new Promise(function (resolve, reject){
    setTimeout(function (){
      console.log("고민끝");
      product = "제로콜라";
      price = "2000";
      reject();
    }, 3000);
  });
}

function pay(){
  console.log(`상품명: ${product}, 가격: ${price}`);
}

function nopay(){
  console.log(`금액부족`)
}

// 마트에 간다 -> 고민을한다 -> 돈이 있다면 구매완료 -> 없다면 금액부족
async function exec(){
  goMart();
    try{
      await pickDrink();
    }catch(err){
      pay();
    }finally{
      nopay();
    }
}
// try catch 안에는 길게 쓰면 좋은거 아님
exec();