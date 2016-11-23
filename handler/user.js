const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const validator = require("validator");
const bcrypt = require("bcrypt");
const config = require("../config.js");
const User = require("../entity/user.js");

const router = new Router({
  prefix: "/api/users"
});

const userService = {
  encryptPassword: async(password) => {
    const saltRound = 10;
    return await bcrypt.hashSync(password, saltRound);
  },
  checkPassword: async(password, hash) => {
    return await bcrypt.compareSync(password, hash);
  },
};

const userMiddleware = {
  getUser: async(userId, ctx, next) => {
    console.log(userId);
    if (validator.isInt(userId)) {
      const user = await User.findById(userId);
      if (user) {
        ctx.user = user;
        await next();
        return;
      }
    }
    ctx.body = "404";
  }
};

const userHanlder = {
  getDetail: async(ctx, next) => {
    ctx.body = {
      user: ctx.user
    };
  },
  getList: async(ctx, next) => {
    const users = await User.findAll();
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

router.use(bodyParser());
router.get("/", userHanlder.getList)
  .post("/", userHanlder.add)
  .param("userId", userMiddleware.getUser)
  .get("/:userId", userHanlder.getDetail)
  .put("/:userId", userHanlder.modify)
  .delete("/:userId", userHanlder.delete);

module.exports = router;
