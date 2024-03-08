const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { create, detail, list, switchRole } = require('../controller/user.controller')
const { sign } = require('../controller/login.controller')

const userRouter = new koaRouter({prefix: '/user'})

// 注册用户
userRouter.post('/', verifyUser, handlePassword, create)

// 获取用户信息
userRouter.get('/', verifyAuth, detail)

// 获取所有未禁用用户
userRouter.get('/list', verifyAuth, list)

// 切换角色
userRouter.patch('/switchRole/:roleCode', verifyAuth, switchRole, sign)

module.exports = userRouter