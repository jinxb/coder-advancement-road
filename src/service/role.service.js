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
      const statement = `SELECT role.*, JSON_ARRAYAGG(rp.permissionId) as permissionIds 
      FROM role 
      LEFT JOIN role_permissions_permission rp ON role.id = rp.roleId 
      GROUP BY role.id 
      LIMIT 0,10;`
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

  async createRole(code, enable, name, permissionIds) {
    // 开启事务
    const conn = await connection.getConnection()
    try {
      conn.beginTransaction()
      // 执行角色插入操作
      const [roleResult] = await conn.execute(
        'INSERT INTO `role` (`code`, `name`, `enable`) VALUES (?, ?, ?)',
        [code, name, enable]
      );
      // 获取新插入角色的ID
      const roleId = roleResult.insertId;
      // 准备权限插入语句
      const permissionInserts = permissionIds.map(id => {
        return conn.execute(
          'INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (?, ?)',
          [roleId, id]
        );
      });
      // 并行执行所有权限插入操作
      await Promise.all(permissionInserts);
      // 提交事务
      await conn.commit();

      return true
    } catch (error) {
       // 如果有错误发生，回滚事务
      if (conn) {
        await conn.rollback();
      }
      throw error;
    } finally {
    // 释放连接回连接池
      if (conn) {
        conn.release();
      }
    }
  }

  async updateRole(id, code, enable, name, permissionIds) {
    const conn = await connection.getConnection()
    try {
      // 开启事务
      await conn.beginTransaction()
      const [roleResult] = await conn.execute('UPDATE role SET `name`=?, `enable`=? WHERE `id` = ?', [name, enable, id])
      // 删除该角色所有权限
      await conn.execute('DELETE FROM role_permissions_permission WHERE roleId=?', [id])
      // 准备权限插入语句
      const permissionInserts = permissionIds.map(pId => {
        return conn.execute(
          'INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (?, ?)',
          [id, pId]
        );
      })
      await Promise.all(permissionInserts)
      await conn.commit()
      return true
    } catch (error) {
      // 如果有错误发生，回滚事务
     if (conn) {
       await conn.rollback();
     }
     console.log(error);
   } finally {
   // 释放连接回连接池
     if (conn) {
       conn.release();
     }
   }
  }

  // 授权
  async grantUsersRole(roleId, userIds) {
    const roleInserts = userIds.map(userId => {
      return connection.execute(`INSERT INTO user_roles_role (userId, roleId) VALUES(?, ?)`, [userId, roleId])
    })
    await Promise.all(roleInserts)
    return
  }
  // 取消授权
  async cancelGrantUsersRole(roleId, userIds) {
    const roleDeletes = userIds.map(userId => {
      return connection.execute(`DELETE FROM user_roles_role WHERE roleId=? AND userId=?`, [roleId, userId])
    })
    await Promise.all(roleDeletes)
    return
  }

  async deleteRole(id) {
    const statement = `DELETE FROM role WHERE id=?`
    const res = connection.execute(statement, [id])
    return res
  }
}

module.exports = new RoleService()