const Router = require("koa-router");
const db = require("./database.js");
const bodyParser = require("koa-bodyparser");

const user = require("./handler/user.js");
const game = require("./handler/game.js");

const baseRouter = new Router({
  prefix: "/api/v1"
});

const baseMiddleware = async(ctx, next) => {
  const tx = await db.seq.transaction();
  ctx.tx = tx;
  try {
    await next();
    await tx.commit();
  } catch(e) {
    console.log(e);
    await tx.rollback();
  }
};

baseRouter.use(bodyParser(), baseMiddleware)
  .use("/users", user.routes(), user.allowedMethods());
  // .use("/games", game.routes(), game.allowedMethods());

module.exports = baseRouter;
