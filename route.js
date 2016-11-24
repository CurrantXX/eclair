const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const user = require("./handler/user.js");
const game = require("./handler/game.js");

const baseRouter = new Router({
  prefix: "/api/v1"
});

baseRouter.use(bodyParser())
  .use("/users", user.routes(), user.allowedMethods())
  .use("/games", game.routes(), game.allowedMethods());

module.exports = baseRouter;
