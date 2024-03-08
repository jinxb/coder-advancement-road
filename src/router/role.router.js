const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { getPermissionTree, getRolePage, list } = require('../controller/role.controller')

const roleRouter = new koaRouter({prefix: '/role'})

// 角色权限树
roleRouter.get('/permissions/tree', verifyAuth, getPermissionTree)

// 获取所有角色
roleRouter.get('/page', verifyAuth, getRolePage)

// 获取所有可用角色
roleRouter.get('/', verifyAuth, list)
module.exports = roleRouter