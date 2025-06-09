const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
port = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json())

const db = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
})


// 생성
app.post('/api/tables', async (req, res, next) => {
  const { tableName } = req.body;
  console.log(tableName);

  await db.promise().query(`
      CREATE TABLE ${tableName}
      (
          id        INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name      VARCHAR(20) NOT NULL,
          createdAt DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`);
   return res.status(201).json({ message: '테이블 생성에 성공하였습니다.' });
})

// 조회
app.get('/api/tables', async(req, res, next) => {
  const [tableList] = await db.promise().query('SHOW TABLES');
  const tableNames  = tableList.map(table => Object.values(table)[0]);
  console.log(tableNames)
  console.log(tableList)
  return res.status(200).json({tableList:tableNames})
})

//삽입
app.post('/api/goods/:id', async(req, res, next) => {
const {tableName} = req.params;
const {name} = req.body;

await db.promise().query(`
  INSERT INTO ${tableName} (name)
  VALUES ('${name}')`);
})

// 조회ㅣ
app.get('/api/goods/:id', async(req, res, next) => {
const {tableName} = req.params;

const [itemList] = await connect.promise().query(`
      SELECT id, name, createdAt
      FROM ${tableName}`);

  return res.status(200).json({ itemList: itemList });
})


app.listen(port, () => {
  console.log(`${port}를 실행중`)
})