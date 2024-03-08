const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  SERVER_PORT,
  SERVER_HOST,
  REDIS_URL,
  ACCESS_TOKEN_EXPIRATION_TIME
} = process.env