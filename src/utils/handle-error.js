const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS, PASSWORD_IS_INCORRECT, USER_DOES_NOT_EXISTS, UN_AUTHORIZATION, OPERATION_IS_NOT_AUTHORIZATION, CAPTCHA_IS_INCORRECT } = require('../config/error')
const app = require('../app')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch(error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '请输入用户名或密码！'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户已存在，请重新输入！'
      break
    case USER_DOES_NOT_EXISTS:
      code = 404
      message = '用户不存在，请重新输入！'
      break
    case PASSWORD_IS_INCORRECT:
      code = 40001
      message = '密码不正确，请重新输入！'
      break
    case UN_AUTHORIZATION: 
      code = 401
      message = '无效的token！'
      break
    case CAPTCHA_IS_INCORRECT: 
      code = 4004
      message = '验证码不正确，请重新输入！'
      break
    case OPERATION_IS_NOT_AUTHORIZATION: 
      code = 401
      message = '无操作该资源的权限！'
      break
    case REQUIRED_PARAMETER_MISSING:
      code = 400
      message = '缺少必要的请求参数！'
      break
    default:
      code = 500
  }
  ctx.body = {
    code,
    message
  }
})