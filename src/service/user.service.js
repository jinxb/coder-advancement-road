const connection = require('../app/database')
class UserService {
  async create(user) {
    try {
      const { name, password } = user
      const statement = 'INSERT INTO user (name, password) VALUES (?, ?)'
      const [res] = await connection.execute(statement, [name, password])
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async findUserById(id) {
    const statement = 'SELECT * FROM user WHERE id = ?'
    const [res] = await connection.execute(statement, [id])
    return res
  }

  async findUserByName(name) {
    const statement = `SELECT u.id, u.name, u.password, u.enable, (SELECT JSON_OBJECT('id', p.id, 'userId', p.user_id, 'avatar', p.avatar_url, 'address', p.address, 'gender', p.gender, 'phone', p.phone, 'email', p.email)  FROM profile p WHERE p.user_id = u.id) as profile, JSON_ARRAYAGG(JSON_OBJECT('id', r.id,'name', r.name, 'code', r.code, 'enable', r.enable)) as roles
    FROM user u 
    LEFT JOIN user_roles_role ur ON u.id = ur.userId
    LEFT JOIN role r ON r.id = ur.roleId
    WHERE u.name = ?
    GROUP BY u.id;
  `
    const [res] = await connection.execute(statement, [name])
    return res
  }
  
  async findUserInfoById(id) {
      const statement = `SELECT u.id, u.name, u.enable, u.createAt, u.updateAt, (SELECT JSON_OBJECT('id', p.id, 'userId', p.user_id, 'avatar', p.avatar_url, 'address', p.address, 'gender', p.gender, 'phone', p.phone, 'email', p.email)  FROM profile p WHERE p.user_id = u.id) as profile, JSON_ARRAYAGG(JSON_OBJECT('id', r.id,'name', r.name, 'code', r.code, 'enable', r.enable)) as roles
      FROM user u 
      LEFT JOIN user_roles_role ur ON u.id = ur.userId
      LEFT JOIN role r ON r.id = ur.roleId
      WHERE u.id = ?
      GROUP BY u.id;
    `
    const [res] = await connection.execute(statement, [id])
    return res[0]
  }

  async findUserAll(offset, size, gender, enable, name) {
    try {
    let queryStr = `SELECT u.id, u.name, u.enable, u.createAt, u.updateAt, (SELECT JSON_OBJECT('id', p.id, 'userId', p.user_id, 'avatar', p.avatar_url, 'address', p.address, 'gender', p.gender, 'phone', p.phone, 'email', p.email)  FROM profile p WHERE p.user_id = u.id) as profile, JSON_ARRAYAGG(JSON_OBJECT('id', r.id,'name', r.name, 'code', r.code, 'enable', r.enable)) as roles FROM user u LEFT JOIN user_roles_role ur ON u.id = ur.userId LEFT JOIN role r ON r.id = ur.roleId`
    const parameters = [];
   
    if (gender) {
       queryStr += ' WHERE p.gender = ?';
       parameters.push(String(gender));
    }
   
    if (enable) {
       if (parameters.length > 0) {
         queryStr += ' AND u.enable = ?';
       } else {
         queryStr += ' WHERE u.enable = ?';
       }
       parameters.push(enable);
    }
   
    if (name) {
       if (parameters.length > 0) {
         queryStr += ' AND u.name LIKE ?';
       } else {
         queryStr += ' WHERE u.name LIKE ?';
       }
       parameters.push(`%${name}%`);
    }
   
    offset = Math.max(offset, 1)
    const startIndex = (offset - 1) * size
    const endIndex = offset * size
    queryStr += ` GROUP BY u.id`
    queryStr += ` LIMIT ?, ?;`
    parameters.push(String(startIndex), String(endIndex))
    const [res] = await connection.execute(queryStr, parameters);
    return res;
    } catch (error) {
        console.log(error);
    }
  }

  async updateUserRole(id, name, roleIds) {
    await connection.execute('DELETE FROM user_roles_role WHERE userId=?', [id])
    const roleInserts = roleIds.map(roleId => {
      return connection.execute(
        'INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (?, ?)',
        [id, roleId]
      );
    });
    await Promise.all(roleInserts);
    return 
  }

  async updateUserPwd(id, password) {
    console.log(id, password);
    const statement = `UPDATE user SET password = ? WHERE id = ?`
    const [res] = await connection.execute(statement, [password, id])
    return res
  }

  async deleteUser(id) {
    const statement = `DELETE FROM user WHERE id=?`
    const [res] = await connection.execute(statement, [id])
    return res
  }
}

module.exports = new UserService()