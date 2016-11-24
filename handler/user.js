import Router from "koa-router";
import UserService from "../service/user.js";
import transaction from "../middleware/mysql-transaction.js";

const router = new Router();

const userHanlder = {
  getList: async(ctx, next) => {
    ctx.body = {
      users: await ctx.userService.getAll()
    };
  },

  add: async(ctx, next) => {
    const user = await ctx.userService.create(ctx.request.body);
    ctx.body = {
      user: user
    };
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
  },

  delete: async(ctx, next) => {
    await ctx.userService.delete(ctx.user);
    ctx.body = "ok";
  }
};

router.use(transaction())
  .use(async(ctx, next) => {
    ctx.userService = new UserService(ctx.tx);
    await next();
  })
  .get("/", userHanlder.getList)
  .post("/", userHanlder.add)
  .param("userId", async(userId, ctx, next) => {
    ctx.user = ctx.userService.getById(userId);
    if (!ctx.user) {
      throw new Error("user not found");
    }
    await next();
  })
  .get("/:userId", userHanlder.getDetail)
  .put("/:userId", userHanlder.modify)
  .delete("/:userId", userHanlder.delete);

export {
  router as
  default
};
