const roleService = require("../service/role.service")
const { handleTree } = require('../utils/common')

class RoleController {
  async getPermissionTree(ctx, next) {
    try {
      const { id, currentRole } = ctx.user
      const { permissions } = await roleService.findPermissionTreeByIdAndRole(id, currentRole.id)
      const result = handleTree(permissions)
      ctx.body = {
        code: 0,
        data: result
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getRolePage(ctx, next) {
    const { pageNo, pageSize } = ctx.request.query
    const result = await roleService.findRoleList(pageNo, pageSize)
    ctx.body = {
      code: 0,
      data: result
    }
  }

  async list(ctx, next) {
    const { enable } = ctx.request.query
    const result = await roleService.findRoleListByEnable(enable)
    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new RoleController()