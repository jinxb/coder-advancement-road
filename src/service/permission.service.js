const connection = require("../app/database");

class PermissionService {
  async findPermissionAll() {
    const statement = 'SELECT * FROM permission'
    const [res] = await connection.execute(statement)
    return res
  }

  async createPermission(params) {
    // 开启事务
    const conn = await connection.getConnection()
    try {
      conn.beginTransaction()
      // 执行菜单插入操作
      const [permissionResult] = await conn.execute(
        'INSERT INTO permission (`code`, `component`, `icon`, `layout`, `name`, `order`, `parentId`, `path`, `type`, `enable`, `show`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        params
      );
      // 获取新插入菜单的ID
      const permissionId = permissionResult.insertId;
      // 准备权限插入语句
      const RoleInserts = [1].map(id => {
        return conn.execute(
          'INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (?, ?)',
          [id, permissionId]
        );
      });
      // 并行执行所有权限插入操作
      await Promise.all(RoleInserts);
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

  async updatePermission(...params) {
    const statement = 'UPDATE permission SET `code`=?, `component`=?, `icon`=?, `layout`=?, `name`=?, `order`=?, `parentId`=?, `path`=?, `type`=?, `enable`=?, `show`=? WHERE `id`=?'
    const [res] = await connection.execute(statement, params)
    return res
  }
}

module.exports = new PermissionService();