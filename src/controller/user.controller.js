const userService = require("../service/user.service")

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await userService.create(user)
    ctx.body = {
      code: 0,
      msg: '注册用户成功',
      data: result
    }
  }

  async detail(ctx, next) {
    const { id, currentRole } = ctx.user
    const result = await userService.findUserInfoById(id)
    ctx.body = {
      code: 0,
      data: {...result, currentRole}
    }
  }

  async list( ctx, next) {
    const { pageNo = 1, pageSize = 10, gender, enable, name } = ctx.request.query
    const result = await userService.findUserAll(pageNo, pageSize, gender, enable, name)
    ctx.body = {
      code: 0,
      data: result
    }
  }

  async switchRole(ctx, next) {
    const { roleCode } = ctx.params
    const { roles } = ctx.user
    let currentRole = roles.find(role => role.code === roleCode)
    ctx.user.curRole = currentRole
    await next()
  }
}

module.exports = new UserController()