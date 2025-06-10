let arr = [];
for (let i = 0; i < 100; i++) {
  arr.push(i+1);
}
console.log(arr);

let sum1 =0;
for(let a=0; a<arr.length; a++){
  sum1 +=arr[a]; 
}
console.log(sum1);

let sum2 =0;
for(i of arr){
  sum2 = sum2 + i;
}
console.log(sum2);

let sum3 =0;
arr.forEach((arr2) => {
  sum3 = sum3+arr2;
});
console.log(sum3);