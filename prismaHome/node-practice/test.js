const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    console.log('Hello');
    res.send('test중입니다')
})

app.listen(port, () =>
    console.log('test port')
)


const http = require('http');
const server = http.createServer((req, res) =>{
    res.writeHead('200');
})

server.listen(8000, () =>{
    console.log('test')
})