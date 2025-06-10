const express = require('express');
const indexRouter = require("./routes/index")
const app = express();
port = 3000;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/', indexRouter);


app.listen(port, ()=> {
  console.log(`${port}를 실행중`)
})