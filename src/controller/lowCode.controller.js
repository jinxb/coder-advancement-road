

class LowCodeController {
  async update(ctx) {
    try {
      console.log('1111---1111')
      const { id, projectName, cpnLibName, port } = ctx.request.body
      redisService.set(`${id}-${projectName}`, {
        cpnLibName,
        port
      }, 60 * 5)
      ctx.body = {
        code: 0,
        data: result
      }
      } catch (error) {
          console.log(error, '=')
      }
  }
  async getLocalProjectInfo(ctx) {
    let ipAddress;
    // 尝试从请求头中获取IP地址
    const forwardedFor = ctx.request.headers['x-forwarded-for'];
    const xRealIp = ctx.request.headers['x-real-ip'];

    // 使用 X-Forwarded-For 优先级更高
    if (forwardedFor && forwardedFor.length > 0) {
      // 通常 X-Forwarded-For 是一个 IP 地址列表，第一个是用户的真实 IP
      ipAddress = forwardedFor.split(',')[0];
    } else if (xRealIp) {
      // 如果没有 X-Forwarded-For，尝试使用 X-Real-IP
      ipAddress = xRealIp;
    } else {
      // 如果以上都没有，使用 Remote-Addr
      ipAddress = ctx.request.connection.remoteAddress;
    }

    // 现在可以访问 ipAddress 变量，它包含了用户的 IP 地址
    console.log('IP Address:', ipAddress);
    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new LowCodeController()