const path = require('path')
const jwt = require('jsonwebtoken')
const getCaptcha = require('../utils/captcha')
const getUUid = require('../utils/uuid')
const redisService = require('../service/redis.service')
const { PRIVATE_KEY } = require(path.resolve(__dirname, '../config/secret'))
class LoginController {
  async sign(ctx, next) {
    const { name, id } = ctx.user
    try {
      const token = jwt.sign({ name, id }, PRIVATE_KEY, { expiresIn: 24 * 60 * 60 , algorithm: 'RS256'})
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
    ctx.type='image/svg+xml'
    ctx.body = {
      data: {
        sid,
        captcha: captcha.data,
      }
    }
  }
}
module.exports = new LoginController()