const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authentication-middleware");

const jwt = require("jsonwebtoken");
const SECRET_KEY = "sessac";

router.get("/login", (req, res, next) => {
  // 임시 데이터
  const user = {
    id: 1,
    username: "홍길동",
    role: "user",
  };

  const token = jwt.sign(user, SECRET_KEY, {
    expiresIn: "10s", 
  });

  return res.json({
    token,
  });
});


router.get("/user", authenticateToken, (req, res, next) => {
  console.log(req.user);

  res.send(req.user);
});

router.get("/set-cookie", (req, res) => {
  res.cookie("login", "true");
  return res.send("Q");
});

router.get("/get-cookie", (req, res) => {
  const cookie = req.cookies["login"];
  console.log(cookie);
  res.json({ cookie });
});

module.exports = router;