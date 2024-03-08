const Redis = require('ioredis')
const { REDIS_URL } = require('../config/server')
class RedisService {
  redisClient = new Redis(REDIS_URL)
  async get(key) {
    return await this.redisClient.get(key)
  }

  async set(key, value, ttl) {
    await this.redisClient.set(key, value)
    if (ttl) {
      await this.redisClient.expire(key, ttl)
    }
  }
  async del(key) {
    await this.redisClient.del(key);
    return true;
  }

  async hashGet(key) {
    return await this.redisClient.hGetAll(key);
  }

  async hashSet(key, obj, ttl) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}

module.exports = new RedisService()