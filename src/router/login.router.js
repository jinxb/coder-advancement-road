const koaRouter = require('@koa/router')
const { verifyLogin } = require('../middleware/login.middleware')
const { sign, captcha } = require('../controller/login.controller')

const loginRouter = new koaRouter({prefix: '/login'})

// 1. 验证密码，生成响应token
loginRouter.post('/', verifyLogin, sign)

// 2. 验证码接口
loginRouter.get('/captcha', captcha)

module.exports = loginRouter