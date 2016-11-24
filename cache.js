import config from "./config.js";
import Redis from "redis";
import BlueBird from "bluebird";

BlueBird.promisifyAll(Redis.RedisClient.prototype);
BlueBird.promisifyAll(Redis.Multi.prototype);
export const redisClient = Redis.createClient(config.redis);
