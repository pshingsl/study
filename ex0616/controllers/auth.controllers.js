
const authService = require('../services/auth.service');

class AuthController {
  
   async signUp(req, res, next) {
    // 요청과 응답을 담당
    // 요청에 대한 처리는 서비스에게 위엄!F
    const { email, password, name } = req.body;

    const newUser = await authService.signUp(email, password, name)

    return res.status(201).json({
      message: "회원가입 성공!",
      newUser
    });
  }

  //로그인
  async login(req, res, next) {

      const{email, password} = req.body;
      const clearLogin = await authService.login(email, password);

      if(!clearLogin){
        return res.send('실패')
      }
      return res.status(200).send('로그인 성공')
  }
}


module.exports = new AuthController();
