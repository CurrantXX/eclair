import bcrypt from "bcrypt";
import User from "../entity/user.js";

class UserService {
  constructor(transaction) {
    this.tx = transaction;
  }

  async encryptPassword(password) {
    const saltRound = 10;
    const salt = await bcrypt.genSaltSync(saltRound);
    return await bcrypt.hashSync(password, salt);
  }

  async checkPassword(password, hash) {
    return await bcrypt.compareSync(password, hash);
  }

  async getAll(offset, limit) {
    const users = await User.findAll({
      transaction: this.tx
    });
    return users;
  }

  async getById(id) {
    const user = await User.findById(id, {
      transaction: this.tx
    });
    return user;
  }

  async create(data) {
    const user = await User.create({
      username: data.username,
      password: await this.encryptPassword(data.password),
      first_name: data.first_name,
      last_name: data.last_name
    }, {
      transaction: this.tx
    });
    return user;
  }

  async modify(user, data) {
    return await user.update({
      username: data.username,
      password: await this.encryptPassword(data.password),
      first_name: data.first_name,
      last_name: data.last_name
    }, {
      transaction: this.tx
    });
  }

  async delete(user) {
    await user.destroy({
      transaction: this.tx
    });
  }
}

export {
  UserService as
  default
};
