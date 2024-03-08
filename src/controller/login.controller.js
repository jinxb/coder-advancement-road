const generateToken = require('../utils/generateToken')

const getCaptcha = require('../utils/captcha')
const { getUUid } = require('../utils/common')
const redisService = require('../service/redis.service')
const { generateRedisTokenKey } = require('../utils/redisContent')
class LoginController {
  async sign(ctx, next) {
    const { name, id } = ctx.user
    try {
      const token = generateToken(ctx.user)
      ctx.body = {
        code: 0,
        data: {
          id,
          name,
          token
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async captcha(ctx, next) {
    const sid = getUUid()
    const captcha = getCaptcha()
    console.log('验证码：', captcha.text);
    redisService.set(sid, captcha.text.toLowerCase(), 60 * 5)
    // ctx.type='image/svg+xml'
    ctx.body = {
      code: 0,
        data: {
          sid,
          captcha: captcha.data,
      }
    }
  }

  async logout(ctx, next) {
    try {
      const { id, name } = ctx.user
      await redisService.del(generateRedisTokenKey({id, name}))
      ctx.body = {
        code: 0,
        data: true
      }
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new LoginController()