const config = require("./config.js");
const Redis = require("redis");
const BlueBird = require("bluebird");

BlueBird.promisifyAll(Redis.RedisClient.prototype);
BlueBird.promisifyAll(Redis.Multi.prototype);
const redisClient = Redis.createClient(config.redis);

module.exports = redisClient;
