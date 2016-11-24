const Koa = require("koa");
const Logger = require("koa-logger");

const router = require("./route.js");
const app = new Koa;
const logger = Logger();

app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
