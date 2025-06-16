
const authRepository = require('../repository/auth.repository');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "ssac";

class AuthService {

  async signUp(email, password, name) {
    // 입력받은 이메일을 보고 데이터 베이스에 값이 있는지 없는지를 체크
    const existngUser = await authRepository.findByEmail(email);
    if (existngUser) {
      throw new Error("ExistEmail")
    }

    //password security
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(
      password,
      salt
    )

    const newUser = await authRepository.createUser(email, bcryptPassword, name)
    return { userId: newUser.userId }
  }

  async login(email, password) {
    const existngUser = await authRepository.findByEmail(email);
    if (!existngUser) {
      throw new Error('유저를 찾을 수 없습니다!')
    }

    const verifyPassword = await bcrypt.compare(password, existngUser.password)
    if (!verifyPassword) {
      throw new Error("PasswordError")
    }

    const token = jwt.sign({
      userId: existngUser.userId
    },
      SECRET_KEY,
      {
        expiresInt: "12h"
      }
    )

    return verifyPassword;
  }
}

module.exports = new AuthService();