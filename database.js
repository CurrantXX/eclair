const Sequelize = require("sequelize");
const Mongoose = require("mongoose");
const config = require("./config.js");


if(config.app.debug) {
  if(!("logging" in config.db.options)) {
    config.db.options.logging = console.log;
  }

  Mongoose.set("debug", true);
}

const sequelize = new Sequelize(config.db.database, config.db.username,
  config.db.password, config.db.options);

Mongoose.Promise = require("bluebird");
Mongoose.connect(config.mongo.uri, config.mongo.options);

module.exports = {
  seq: sequelize,
  mongo: Mongoose
};
