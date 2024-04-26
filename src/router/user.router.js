const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { create, detail, update, resetPwd, changePwd, list, deleteUser, switchRole } = require('../controller/user.controller')
const { sign, logout } = require('../controller/login.controller')

const userRouter = new koaRouter({prefix: '/user'})

// 注册用户
userRouter.post('/', verifyUser, handlePassword, create)

// 获取用户信息
userRouter.get('/', verifyAuth, detail)

// 重置用户密码
userRouter.patch('/password/reset/:id', verifyAuth, handlePassword, resetPwd)

// 更改密码
userRouter.post('/password/change', verifyAuth, changePwd, logout)

// 获取所有未禁用用户
userRouter.get('/list', verifyAuth, list)

// 切换角色
userRouter.patch('/switchRole/:roleCode', verifyAuth, switchRole, sign)

// 分配角色
userRouter.patch('/:id', verifyAuth, update)

// 删除用户
userRouter.delete('/:id', verifyAuth, deleteUser)

module.exports = userRouter