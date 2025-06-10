// const test = require('./math');
// const math = require('./math2');

const { text } = require("express");

// console.log(test);
// console.log(test(3,2));
// console.log()
// console.log(math);
// console.log(math.add(math.PI, math.E))
// console.log()

// //구조 분해 할당
// const add = require('./math');
// console.log(add);
// const onlyOne = require('./math');
// console.log(onlyOne);
// const{add1, E, PI} = require('./math2');
// console.log(add(E, PI));

// //실습1
// const word1 = "abc";
// const word2 = "xyz";
// const re = [...word1,...word2];
// console.log(re);

// class House{
//   constructor(name, year){
//     this.name = name;
//     this. year = year;
//   }
//   age(){
//   console.log(`건축한지 ${2025 - this.year}년 되었어요`)
//  } 
// }

// class Apartment extends House{
//   constructor(name, year){
//      super(name, year);
//   }

//   getAge(){
//     this.age();
//   }
// }
// const apt = new Apartment("test", 20);
// apt.getAge();

// class Shape{
//   constructor(width, height){
//     this.width = width;
//     this.height = height;
//   }
//   getArea(){
//     return this.width * this.height;
//   }
// }

// //실습2
// // 직사각형
// class Rectangle extends Shape{
//   constructor(width, height){
//     super(width, height);
//     this.width = width;
//     this.height = height;
//   }
//     getArea() {
//      return Math.sqrt(this.width + this.height);
//     }
// }

// // 삼각형
// class Triangle extends Shape{
//   constructor(width, height){
//     super(width, height);
//   }
//     getArea() {
//      return (this.width * this.height)/2;
//     }
// }

// // 원 만들기 r**2*3.14
// class Circle extends Shape{
//   constructor(r, pi){
//     super(r, pi);
//     this.pi = pi;
//     this.r = r;
//   }
//     getArea() {
//      return this.r **2 * this.pi
//     }
// }

// const rec1 = new Shape(3,4);
// console.log(rec1.getArea());
// const rec2 = new Rectangle(3, 6);
// console.log(rec2.getArea());
// const rec3 = new Triangle(3, 6);
// console.log(rec3.getArea());
// const rec4 = new Circle(3, 3.14);
// console.log(rec4.getArea());

//실습3