const md5Password = require('../utils/md5-password')
const userService = require('../service/user.service')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error')
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  try {
    if (!name || !password) {
      ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
      return
    }
    const users = await userService.findUserByName(name)
    if (users.length) {
      ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
      return
    }
    await next()
  } catch (error) {
    console.log(error)
  }
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}