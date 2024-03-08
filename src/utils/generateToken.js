const path = require('path')
const jwt = require('jsonwebtoken')
const redisService = require('../service/redis.service')
const { generateRedisTokenKey } = require('./redisContent')
const { PRIVATE_KEY } = require(path.resolve(__dirname, '../config/secret'))
const { ACCESS_TOKEN_EXPIRATION_TIME } = require('../config/server')

function generateToken(user) {
  const { name, id, roles, curRole } = user
  const currentRole = curRole || roles[0]
  const token = jwt.sign({ name, id, roles, currentRole }, PRIVATE_KEY, { algorithm: 'RS256' })
  redisService.set(generateRedisTokenKey({id, name}), token, ACCESS_TOKEN_EXPIRATION_TIME)

  return token
}

module.exports = generateToken