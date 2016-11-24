import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import user from "./handler/user.js";
import game from "./handler/game.js";

const baseRouter = new Router({
  prefix: "/api/v1"
});

baseRouter.use(bodyParser())
  .use("/users", user.routes(), user.allowedMethods())
  .use("/games", game.routes(), game.allowedMethods());

export {
  baseRouter as
  default
};
