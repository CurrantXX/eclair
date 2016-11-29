import Router from "koa-router";
import GameService from "../service/game.js";

const router = new Router();

const gameHandler = {
  getList: async(ctx, next) => {
    const games = await ctx.gameService.getAll();

    ctx.body = {
      games: games
    };
  },
  getDetail: async(ctx, next) => {
    ctx.body = "test";
  }
};

export default router.use(async(ctx, next) => {
    ctx.gameService = new GameService(ctx.tx);
    await next();
  })
  .get("/", gameHandler.getList);
