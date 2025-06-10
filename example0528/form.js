const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', "ejs");
app.set("/views", express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req, res) => 
  res.render("form2", {title: 'practice'}));

app.get("/getForm", (req, res) => {
  res.render('getresult2', {
    title: 'check',
    userInfo: req.query, 
  });
});

app.listen(port, () => console.log(`http://localhost: ${port}`));