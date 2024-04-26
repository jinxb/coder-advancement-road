const permissionService = require("../service/permission.service");
const roleService = require("../service/role.service");
const { handleTree } = require('../utils/common')
const { REQUIRED_PARAMETER_MISSING } = require("../config/error");
class PermissionController {
  static commonStatement(ctx) {
    const { code, component = null, icon = null, layout = null, name, order = null, parentId= null, path = null, type, enable = 1, show = 0
    } = ctx.request.body
    if (!code || !name || !type) {
      ctx.app.emit('error', REQUIRED_PARAMETER_MISSING, ctx)
      return
    }
    const enumType = {
      true: 1,
      false: 0
    }
    return [code, component, icon, layout, name, String(order), parentId ? String(parentId) : parentId, path,type, enumType[enable] || 1, enumType[show] || 0]
  }

  async create(ctx, next) {
    try {
    const result = await permissionService.createPermission(PermissionController.commonStatement(ctx))
    ctx.body = {
      code: 0,
      data: result
    }
    } catch (error) {
        console.log(error, '=')
    }
  }

  async update(ctx, next) {
    try {
      console.log('123');
      const { id } = ctx.params
      const params = PermissionController.commonStatement(ctx)
      const result = await permissionService.updatePermission(...params, id)
      ctx.body = {
        code: 0,
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }

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