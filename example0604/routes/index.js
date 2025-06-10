const express = require('express');

const router = express.Router();
// controller 안에 함수를 쓰기 위해 모듈을 불러옴
const controller = require('../controller')

const {getDbComments} = require('../model/comment');
router.get("/", controller.getMain)

router.post("/post", controller.postMain)

//데이터베이스에서 요청한 값 불러오기
router.get("/:id", controller.getId)
module.exports = router;
