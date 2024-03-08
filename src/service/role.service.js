const connection = require("../app/database")

class RoleService {
  async findPermissionTreeByIdAndRole(id, role) {
    const statement = `
      SELECT JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'name', p.name, 'code', p.code, 'type', p.type, 'parentId', p.parentId, 'path', path, 'redirect', p.redirect, 'icon', p.icon,'component', p.component, 'layout', p.layout, 'keepAlive', p.keepAlive, 'method', p.method, 'description', p.description, 'show', p.show, 'enable', p.enable, 'order', p.order)) permissions
      FROM user u 
      LEFT JOIN user_roles_role ur ON u.id = ur.userId
      LEFT JOIN role_permissions_permission rp ON ur.roleId = rp.roleId
      LEFT JOIN permission p ON p.id = rp.permissionId
      WHERE u.id = ? AND ur.roleId = ?;
    `
    const [res] = await connection.execute(statement, [id, role])
    return res[0]
  }

  async findRoleList(offset = 1, size = 10) {
    try {
      offset = Math.max(offset, 1)
      const startIndex = (offset - 1) * size
      const endIndex = offset * size
      const statement = `SELECT * FROM role LIMIT ?,?;`
      const [res] = await connection.execute(statement, [String(startIndex), String(endIndex)])
      return res
    } catch (error) {
      console.log(error);
    }
  }

  async findRoleListByEnable(enable) {
    let statement = 'SELECT * FROM role'
    const values = []
    if (enable) {
      statement += ` WHERE enable = ?;`
      values.push(String(enable))
    }
    const [res] = await connection.execute(statement, values)
    return res
  }
}

module.exports = new RoleService()