const permissionService = require("../service/permission.service");
const roleService = require("../service/role.service");
const { handleTree } = require('../utils/common')

class PermissionController {
  async getMenuTree(ctx, next) {
    const { id, currentRole } = ctx.user
    const { permissions } = await roleService.findPermissionTreeByIdAndRole(id, currentRole.id)
    const result = handleTree(permissions)
    ctx.body = {
      code: 0,
      data: result
    }
  }

  async getAllPermissionTree(ctx, next) {
    const result = await permissionService.findPermissionAll()

    const data = handleTree(result)
    ctx.body = {
      code: 0,
      data
    }
  }
}

module.exports = new PermissionController();