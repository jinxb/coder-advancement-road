const path = require('path')
const { PUBLIC_KEY } = require(path.resolve(__dirname, '../../config/secret'))
function generateRedisTokenKey(userInfo) {
  return `${PUBLIC_KEY}:${userInfo.id}:${userInfo.name}`
}

module.exports = {
  generateRedisTokenKey
}