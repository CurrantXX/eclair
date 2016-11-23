const Koa = require("koa");
const Logger = require("koa-logger");

const route = require("./route.js");
const app = new Koa;
const logger = Logger();

app.use(logger);
app.use(route);

app.listen(3000);
