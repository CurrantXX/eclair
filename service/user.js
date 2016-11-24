const db = require("../database.js");
const User = require("../entity/user.js");

const userService = {
  encryptPassword: async function(password) {
    const saltRound = 10;
    return await bcrypt.hashSync(password, saltRound);
  },

  checkPassword: async function(password, hash) {
    return await bcrypt.compareSync(password, hash);
  },

  getAll: async function(offset, limit, tx = null) {
    const users = await User.findAll({}, {
      transaction: tx
    });
    return users;
  },

  getById: async function(id, tx = null) {
    const user = await User.findById(id, {
      transaction: tx
    });
    return user;
  },

  create: async function(data, tx = null) {
    const user = await User.create({
      username: data.username,
      password: await this.encryptPassword(data.password),
      first_name: data.first_name,
      last_name: data.last_name
    }, {
      transaction: tx
    });
    return user;
  },

  modify: async function(id, data, tx = null) {
    if(tx === null) {
      tx = await db.seq.transaction();
    }

    const core = async(tx) => {
      const user = await this.getById(id, tx);
      return await user.update({
        username: data.username,
        password: await this.encryptPassword(data.password),
        first_name: data.first_name,
        last_name: data.last_name
      }, {
        transaction: tx
      });
    };
    if (tx !== null) {
      await core(tx);
    } else {
      return await User.transaction(async(tx) => {
        await core(tx);
      });
    }
  },

  deleteById: async function(id, tx = null) {
    const core = async(tx) => {
      const user = await this.getById(id, tx);
      await user.destroy({transaction: tx});
    };

    if (tx !== null) {
      await core(tx);
    } else {
      return await User.transaction(async(tx) => {
        await core(tx);
      });
    }
  }
};
