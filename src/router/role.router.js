const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { getPermissionTree, getRolePage, list, create, update, deleteRole, grantUsersRole, cancelGrantUsersRole } = require('../controller/role.controller')

const roleRouter = new koaRouter({prefix: '/role'})

// 角色权限树
roleRouter.get('/permissions/tree', verifyAuth, getPermissionTree)

// 获取所有角色
roleRouter.get('/page', verifyAuth, getRolePage)

// 获取所有可用角色
roleRouter.get('/', verifyAuth, list)

// 创建新角色
roleRouter.post('/', verifyAuth, create)

// 更新
roleRouter.patch('/:id', verifyAuth, update)

// 角色授权给用户
roleRouter.patch('/grant/add/:roleId', verifyAuth, grantUsersRole)

// 取消授权
roleRouter.patch('/grant/remove/:roleId', verifyAuth, cancelGrantUsersRole)

// 删除角色
roleRouter.delete('/:id', verifyAuth, deleteRole)
module.exports = roleRouter