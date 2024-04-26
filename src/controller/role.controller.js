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

  async create(ctx, next) {
    const { code, enable = 1, name, permissionIds } = ctx.request.body
    const result = await roleService.createRole(code, enable, name, permissionIds)
    ctx.body = {
      code: 0,
      data: result
    }
  }

  async update(ctx, next) {
    try {
      const { id } = ctx.params
      const { code, enable = 1, name, permissionIds } = ctx.request.body
      const result = await roleService.updateRole(id, code, enable, name, permissionIds)
      ctx.body = {
        code: 0,
        msg: "更新成功"
      }
    } catch (error) {
      console.log(error, '====');
    }
  }

  async deleteRole(ctx, next) {
    try {
      const { id } = ctx.params
      const result = await roleService.deleteRole(id)
      ctx.body = {
        code: 0,
        msg: "删除角色成功"
      }
    } catch (error) {
      console.log(error);
    }
  }

  async grantUsersRole(ctx, next) {
    const { roleId } = ctx.params
    const { userIds } = ctx.request.body
    const result = await roleService.grantUsersRole(roleId, userIds)
    ctx.body = {
      code: 0,
      msg: "授权成功"
    }
  }

  async cancelGrantUsersRole(ctx, next) {
    const { roleId } = ctx.params
    const { userIds } = ctx.request.body
    const result = await roleService.cancelGrantUsersRole(roleId, userIds)
    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new RoleController()