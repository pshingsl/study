const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const port = 3000;
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}).promise();

//생성
app.post('/api/tables/', async (req, res, next) => {
    const { tableName } = req.body;

    //테이블 생성
    await db.query(`
        CREATE TABLE  ${tableName}
    (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(20) NOT NULL,
     creatAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

    return res.json({ message: '테이블 생성에 성공하였습니다.' });

})

// 목록
app.get('/api/tables/', async (req, res, next) => {
    const [tableList] = await db.promise().query('SHOW TABLES');
    const tableNames = tableList.map(table => Object.values(table)[0]);
    return res.status(200).json({ tableList: tableNames })
    res.send("테이블 조회")
})

// 삽입
app.post('/api/goods/:id', async (req, res, next) => {
    const { tableName } = req.params;
    const { name } = req.body;

    await db.promise().query(`
     INSERT INTO ${tableName} (name)
     VALUES ('${name}')`);
    res.send("데이터터 값 등록")
})

// 조회.
app.post('/api/goods/:id', async (req, res, next) => {
    const { tableName } = req.body;

    //테이블 생성
    await db.query(`
        CREATE TABLE  ${tableName}
    (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(20) NOT NULL,
     creatAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

    return res.json({ message: '테이블 생성에 성공하였습니다.' });

})


app.listen(port, () => {
    console.log(`${port} 연결을 성공했습니다.`)
})