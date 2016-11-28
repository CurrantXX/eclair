import config from "./config.js";
import Redis from "redis";
import BlueBird from "bluebird";

BlueBird.promisifyAll(Redis.RedisClient.prototype);
BlueBird.promisifyAll(Redis.Multi.prototype);
export default Redis.createClient(config.redis);
