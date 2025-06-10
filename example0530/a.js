const express = require('express');

const router = express.Router();

router.get("/", (req, res)=> {
  res.render("post");
})

// 밖에서 사용하는법

module.exports = router;