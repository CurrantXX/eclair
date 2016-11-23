const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const validator = require("validator");
const Game = require("../entity/game.js");

const router = new Router({
  prefix: "/api/games"
});

const gameHandler = {
  getList: async(ctx, next) => {
    let games;
    await Game.find().exec((err, results) => {
      games = results;
    });

    ctx.body = {
      games: games
    };
  },
  getDetail: async(ctx, next) => {
    ctx.body = "test";
  }
};

router.use(bodyParser());
router.get("/", gameHandler.getList)
  .get("/:gameId", gameHandler.getDetail);

module.exports = router;
