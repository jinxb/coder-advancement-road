const path = require('path')
const jwt = require('jsonwebtoken')
const userService = require('../service/user.service')
const md5Password = require("../utils/md5-password")
const { PUBLIC_KEY } = require(path.resolve(__dirname, '../config/secret'))
const { NAME_OR_PASSWORD_IS_REQUIRED, USER_DOES_NOT_EXISTS, CAPTCHA_IS_INCORRECT, UN_AUTHORIZATION, PASSWORD_IS_INCORRECT } = require("../config/error")
const redisService = require('../service/redis.service')
const { generateRedisTokenKey } = require('../utils/redisContent')


const verifyLogin = async (ctx, next) => {
  try {
    const { name, password, sid, captcha } = ctx.request.body
    if (!name || !password) {
      ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
      return 
    }
    const users = await userService.findUserByName(name)
    const user = users[0]
    if (!user) {
      ctx.app.emit('error', USER_DOES_NOT_EXISTS, ctx)
      return
    }
    if (user.password !== md5Password(password)) {
      ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
      return 
    }
    if (await redisService.get(sid) !== captcha.toLowerCase()) {
      ctx.app.emit('error', CAPTCHA_IS_INCORRECT, ctx)
      return 
    }
    ctx.user = user
    await next()
  } catch (error) {
    console.log(error);
  }
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.header.authorization
  if (!authorization) {
    ctx.app.emit('error', UN_AUTHORIZATION, ctx)
    return
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    const { id, name } = result
    const key = generateRedisTokenKey({id, name})
    if (!await redisService.get(key)) {
      ctx.app.emit('error', UN_AUTHORIZATION, ctx)
      return
    }
    // 增长时间
    ctx.user = result
    await next()
  } catch (error) {
    ctx.app.emit('error', UN_AUTHORIZATION, ctx)
    return
  }
}


module.exports = {
  verifyLogin,
  verifyAuth
}