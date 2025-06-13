module.exports = function (err, req, res, next) {

  switch (err.message) {
    case "password":
      return res.status(400).send({
        errorMessage: "패스워드가 일치하지 않습니다.",
      });
    case "ExistEmail":
      return res.status(400).send({
        errorMesaage: "이미 가입된 이메일입니다.",
      });
    case "Forbidden":
      return res.status(401).send({
        errorMesaage: "접근 권한이 없습니다.",
      });
  }
};