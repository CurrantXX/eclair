const db = require("../database.js");


const GameSchema = new db.mongo.Schema({
  _id: {
    type: String
  },
  type: {
    type: String,
    enum: ["lottery", "rank"]
  },
  title: String,
  logo: String
});

const Game = db.mongo.model("Game", GameSchema);

module.exports = Game;
