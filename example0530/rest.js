const express = require('express');
const app = express();

const aRouter = require('./a');
const port = 3000;

// app.set("view engine", "ejs");
// app.use('/views', express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/a", aRouter);
// const user = require('./user')
// app.use("/user", user);

const goods = [{
    goodsId: 1,
    goodName: "상품 1",
    category: "drink",
    price: 1000
    }];

app.get("/api/goods", (req, res) => {
  res.send({goods,});
 });

 app.post('/api/goods', (req, res) => {
  res.send({
    goods: [{
    goodsId: 1,
    goodName: "상품 1",
    category: "drink",
    price: 1000
    },
    {
    goodsId: 2,
    goodName: "상품 2",
    category: "drink",
    price: 3000
    },
    ]})
 })

 app.get('/api/goods/:id', (req, res) => {
  res.send({
"goodsId": 1,
"goodName": "상품 1",
"category": "drink",
"price": 1000
})
 })

 app.put('/api/goods/:id', (req, res) => {
  res.send({
      goods: [{
      goodsId: 1,
      goodName: "상품 1",
      category: "drink",
      price: 1000
      },
      {
      goodsId: 2,
      goodName: "상품 2",
      category: "drink",
      price: 5000
      },
      ]})
 })

 app.delete('/api/goods/:id', (req, res) =>{
  res.send({
    goods: [{
    goodsId: 1,
    goodName: "상품 1",
    category: "drink",
    price: 1000
    }
    ]})
 })

 // 실습2 
const users = [1,2,3,4,5];
const posts = [
	{
		"id": 1,
		"userId": 2,
		"title": "첫 번째 글",
		"content": "안녕하세요 게시판입니다.",
		"createdAt": "2025-05-29T10:00:00Z"
	},
		{
		"id": 2,
		"userId": 2,
		"title": "두 번째 글",
		"content": "안녕하세요 게시판2입니다.",
		"createdAt": "2025-05-29T10:00:00Z"
	}
];

app.get('/users', (req, res)=>{
  const tempRes = [];
  users.forEach((element)=>{
    tempRes.push({
      id:element,
    })
  })
  res.send({
    test: tempRes,
  });
});

// 사용자 등록 
//  똑같은 게 들어오면(조건) 해당 사용자가 있다.
app.post('/users', (req, res)=>{
  const { id } = req.params;
  if(users.includes(id)){
    return res.send({
      "error": "이미 존재하는 사용자입니다."
    });
  }
  users.push(id);
  res.send({
    id,
  });
})

//사용자 상세 조회
app.get('/users/:id', (req, res)=>{
 const { id }= req.params
 console.log(id);
 if(users.includes(id)){
    return res.send({ id });
 }
  res.send({
"error": "해당 사용자를 찾을 수 없습니다."
});
})

//사용자 삭제
app.delete('/users/:id', (req, res)=>{
 const { id } = req.params;
 if(users.includes(Number(id))){
for(let i = 0; i < users.length; i++) {
  if(users[i] === Number(id))  {
    users.splice(i, 1);
    break;
  }
}
return res.send({
"error": "해당 사용자를 찾을 수 없습니다."
})
 }

})

app.listen(port, () =>{
  console.log(`${port}`)
})

module.exports