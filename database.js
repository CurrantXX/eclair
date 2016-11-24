import Sequelize from "sequelize";
import Mongoose from "mongoose";
import config from "./config.js";

if (config.app.debug) {
  if (!("logging" in config.db.options)) {
    config.db.options.logging = console.log;
  }

  Mongoose.set("debug", true);
}

export const sequelize = new Sequelize(config.db.database, config.db.username,
  config.db.password, config.db.options);

Mongoose.Promise = require("bluebird");
Mongoose.connect(config.mongo.uri, config.mongo.options);

export const mongo = Mongoose;
