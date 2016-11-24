import Koa from "koa";
import createLogger from "concurrency-logger";
import router from "./route.js";

const app = new Koa;
const logger = createLogger();


app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
