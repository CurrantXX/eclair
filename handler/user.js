const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const validator = require("validator");
const bcrypt = require("bcrypt");
const redis = require("../cache.js");

const router = new Router({
  prefix: "/api/users"
});

const userHanlder = {
  getDetail: async(ctx, next) => {
    ctx.body = {
      user: ctx.user
    };
  },

  getList: async(ctx, next) => {
    let users = [];
    try {
      users = JSON.parse(await redis.getAsync("users"));
    } catch(e) {
      users = [];
    }
    if(users === null || users.length === 0) {
      users = await User.findAll();
      await redis.setAsync("users", JSON.stringify(users));
    }
    ctx.body = {
      users: users
    };
  },

  add: async(ctx, next) => {
    const data = ctx.request.body;
    if ("password" in data) {
      data.password = await userService.encryptPassword(data.password);
    }
    await User.create(data).then((user) => {
      ctx.body = user;
    }).catch(error => {
      ctx.body = "error: " + error;
    });
  },

  modify: async(ctx, next) => {
    const data = ctx.request.body;
    if ("password" in data) {
      data.password = await userService.encryptPassword(data.password);
    }
    await ctx.user.update(data).then(() => {
      ctx.body = ctx.user;
    }).catch(error => {
      ctx.body = "error: " + error;
    });
  },

  delete: async(ctx, next) => {
    await ctx.user.destroy();
    ctx.body = "ok";
  }
};

router.use(bodyParser())
  .get("/", userHanlder.getList)
  .post("/", userHanlder.add)
  .param("userId", userMiddleware.getUser)
  .get("/:userId", userHanlder.getDetail)
  .put("/:userId", userHanlder.modify)
  .delete("/:userId", userHanlder.delete);

module.exports = router;
