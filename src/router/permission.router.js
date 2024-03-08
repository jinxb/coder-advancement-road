const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { getMenuTree, getAllPermissionTree } = require('../controller/permission.controller')
const permissionRouter = new koaRouter({prefix: '/permission'})

permissionRouter.get('/menu', verifyAuth, getMenuTree)
permissionRouter.get('/tree', verifyAuth, getAllPermissionTree)

module.exports = permissionRouter