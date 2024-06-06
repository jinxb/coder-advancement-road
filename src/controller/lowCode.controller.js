const redisService = require('../service/redis.service')

class LowCodeController {
  async update(ctx) {
    try {
      const { ip, projectName, cpnLibName, port } = ctx.request.body
      console.log('1111---1111', ip, projectName, cpnLibName, port)
      redisService.set(ip, JSON.stringify({
        projectName,
        cpnLibName,
        port
      }), 60 * 5)
      ctx.body = {
        code: 0,
        data: 'ok'
      }
      } catch (error) {
          console.log(error, '=')
      }
  }
  async getLocalProjectInfo(ctx) {
    try {
      const data = await redisService.get('192.168.214.19')
      ctx.body = {
        code: 0,
        data: JSON.parse(data)
      }
    } catch (error) {
      console.log(error, '=====')
    }
  }
}

module.exports = new LowCodeController()