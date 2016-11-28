import Koa from "koa";
import createLogger from "concurrency-logger";
import router from "./route.js";

const server = new Koa;
const logger = createLogger();


server.use(logger);
server.use(router.routes());
server.use(router.allowedMethods());

export const app = server.listen(3000);
