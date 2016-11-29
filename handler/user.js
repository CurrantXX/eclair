import Router from "koa-router";
import UserService from "../service/user.js";
import transaction from "../middleware/mysql-transaction.js";
import cache from "../cache.js";

const router = new Router();

const userHanlder = {
  getList: async(ctx, next) => {
    let users = await cache.getAsync("users");
    if (users) {
      users = JSON.parse(users);
    } else {
      users = await ctx.userService.getAll();
      await cache.setAsync("users", JSON.stringify(users));
      await cache.expireAsync("users", 5);
    }

    ctx.body = {
      users: users
    };
  },

  add: async(ctx, next) => {
    const user = await ctx.userService.create(ctx.request.body);
    ctx.body = {
      user: user
    };
    cache.delAsync("users");
  },

  getDetail: async(ctx, next) => {
    ctx.body = {
      user: ctx.user
    };
  },

  modify: async(ctx, next) => {
    const user = await ctx.userService.modify(ctx.user, ctx.request.body);
    ctx.body = {
      user: user
    };
    cache.delAsync("users");
  },

  delete: async(ctx, next) => {
    await ctx.userService.delete(ctx.user);
    ctx.body = "ok";
  }
};

export default router.use(transaction())
  .use(async(ctx, next) => {
    ctx.userService = new UserService(ctx.tx);
    await next();
  })
  .get("/", userHanlder.getList)
  .post("/", userHanlder.add)
  .param("userId", async(userId, ctx, next) => {
    ctx.user = ctx.userService.getById(userId);
    if (!ctx.user) {
      throw new Error({
        msg: "User not found",
        status: 400
      });
    }
    await next();
  })
  .get("/:userId", userHanlder.getDetail)
  .put("/:userId", userHanlder.modify)
  .delete("/:userId", userHanlder.delete);
