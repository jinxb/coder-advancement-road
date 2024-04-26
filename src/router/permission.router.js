const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, update, getMenuTree, getAllPermissionTree } = require('../controller/permission.controller')
const permissionRouter = new koaRouter({prefix: '/permission'})

permissionRouter.post('/', verifyAuth, create)
permissionRouter.patch('/:id', verifyAuth, update)
permissionRouter.get('/menu', verifyAuth, getMenuTree)
permissionRouter.get('/tree', verifyAuth, getAllPermissionTree)

module.exports = permissionRouter