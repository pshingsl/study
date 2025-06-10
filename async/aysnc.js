// async & await
// promise 와 async & await 상황에 맞춰서 써야한다

// 1.aysnc
// function fetchUser(){
//     // 네트워크가 10초후에 반응
//     // async & await 동기적이다 -> 순차적으로 수행 -> 10초가 지나기 전까지 수행을 안함 -> Promise pending 발생
//     // -> promise를 사용해서 문제를 해결해야한다
//     return new Promise((resolve, reject) => {
//         resolve('Hyuk');
//     });
// }
// 문제 해결을 위해 함수 앞에 async 사용

async function fetchUser(){
    return 'huk'
}

const user = fetchUser();
user.then(console.log); // fetch user의 값을 user객체를 통해 가져옴
console.log(user);

// await은 async가 붙은 함수 안에서 사용 가능 -> 기다려 
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function getApple() {
    await delay(1000);
    return 'apple'
}


async function getBanana() {
    await delay(1000);
    return 'Banana'
}

async function pickFruits(){
    const applePromise = getApple(); //  개선코드 서로 연관되어 있지 않음 -> 각각 함수로 선언
    const bananaPromise = getBanana(); //  개선코드
    const apple = await applePromise;
    const banana = await bananaPromise;
    // const apple = await getApple();
    // const banana = await getBanana();
    return `${apple} + ${banana}`
}


// promise를 callback hell로 만들기
// function pickFruits(){
//     return getApple()
//     .then(apple => {
//         return getBanana()
//         .then(banana => `${apple} + ${banana}`);
//     })
// }

pickFruits().then(console.log);

// useful API
function pickAllFruits(){
    return Promise.all([getApple(), getBanana()]).then(fruits => fruits.join('+'))
}
pickAllFruits().then(console.log);

function pickOnlyOne(){
    return Promise.race([getApple(), ])
}

