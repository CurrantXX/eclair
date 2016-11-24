import {
  mongo
} from "../database.js";


const GameSchema = new mongo.Schema({
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

const Game = mongo.model("Game", GameSchema);

export {
  Game as
  default
};
