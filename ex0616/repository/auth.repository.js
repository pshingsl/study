const prisma = require('../utils/prisma/index')

class AutoRepository {

  // 이메일 값이 있으면 돌려준다
  async findByEmail(email) {
    return await prisma.users.findFirst({
      where: { email }
    })
  }

  async createUser(email, password, name) {
    return await prisma.users.create({
      data: {
        email,
        password,
        name
      }
    })
  }

}

module.exports = new AutoRepository();