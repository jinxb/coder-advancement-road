const userService = require("../service/user.service")
const md5Password = require('../utils/md5-password')
const { PASSWORD_IS_INCORRECT } = require('../config/error')

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

  // 切换角色
  async switchRole(ctx, next) {
    const { roleCode } = ctx.params
    const { roles } = ctx.user
    let currentRole = roles.find(role => role.code === roleCode)
    ctx.user.curRole = currentRole
    await next()
  }

  async update(ctx, next) {
    try {
      const { id } = ctx.params
      const { name, roleIds } = ctx.request.body
      const result = await userService.updateUserRole(id, name, roleIds)
      ctx.body = {
        code: 0,
        msg: '更新用户角色成功',
      }
    } catch (error) {
      console.log(error);
    }
  }

  async resetPwd(ctx, next) {
    try {
      const { id } = ctx.params
      const { password } = ctx.request.body
      const result = await userService.updateUserPwd(id, password)
      ctx.body = {
        code: 0,
        msg: '重置密码成功'
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changePwd(ctx, next) {
    try {
      const { oldPassword, newPassword } = ctx.request.body
      const { id } = ctx.user
      const users = await userService.findUserById(id)
      const user = users[0]
      console.log(user.password, md5Password(oldPassword));
      if (user.password !== md5Password(oldPassword)) {
        ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
        return 
      }
      const result = await userService.updateUserPwd(id, md5Password(newPassword))
      await next()
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUser(ctx, next) {
    const { id } = ctx.params
    const result = await userService.deleteUser(id)
    ctx.body = {
      code: 0,
      msg: '删除用户成功'
    }
  }
}

module.exports = new UserController()