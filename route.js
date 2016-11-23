const compose = require("koa-compose");
const user = require("./handler/user.js");
const game = require("./handler/game.js");

const combineRouters = routers => {
  const middleware = [];

  routers.forEach(router => {
    middleware.push(router.routes());
    middleware.push(router.allowedMethods());
  });

  return compose(middleware);
};

const route = combineRouters([user, game]);

module.exports = game.routes();
