const { v4 : uuidv4 } = require('uuid')
/**
 *使用 uuidv4 函数生成 UUID。
 *
 *@return {string} 生成的UUID
 */
function getUUid() {
  return uuidv4()
}

function generateToken(user) {
  const { name, id, roles, curRole } = user
  const currentRole = curRole || roles[0]
  const token = jwt.sign({ name, id, roles, currentRole }, PRIVATE_KEY, { algorithm: 'RS256' })
  redisService.set(generateRedisTokenKey({id, name}), token, ACCESS_TOKEN_EXPIRATION_TIME)

  return token
}

/**
 * 处理输入数据以根据指定的 id、parentId 和 Children 属性创建树结构。
 *
 * @param {Array} data -表示树节点的对象的输入数组。
 * @param {string} [id=] -表示每个节点的唯一标识符的属性名称。
 * @param {string} [parentId=] -表示父节点标识符的属性名称。
 * @param {string} [children=] -表示每个节点的子节点的属性名称。
 * @return {Array} 基于输入数据和属性的树结构。
 */
function handleTree(data, id='id', parentId='parentId', children='children') {
  const tree = []
  const childrenList = {}
  const nodeIds = {}
  for (const d of data) {
    const parentVal = d[parentId]
    const nodeId = d[id]
    if (!childrenList[parentVal]) {
      childrenList[parentVal] = []
    }
    childrenList[parentVal].push(d)
    nodeIds[nodeId] = d
  }
  for (const d of data) {
    if (!nodeIds[d[parentId]]) {
      tree.push(d)
    }
  }
  for (const t of tree) {
    handleChildren(t)
  }
  function handleChildren(t) {
    if (childrenList[t[id]]) {
      t[children] = childrenList[t[id]]
    }
    if (t[children]) {
      for (const c of t[children]) {
        handleChildren(c)
      }
    }
  }
  return tree
}

module.exports = {
  getUUid,
  generateToken,
  handleTree
}


