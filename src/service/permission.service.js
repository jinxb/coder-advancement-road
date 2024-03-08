const connection = require("../app/database");

class PermissionService {
  async findPermissionAll() {
    const statement = 'SELECT * FROM permission'
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new PermissionService();