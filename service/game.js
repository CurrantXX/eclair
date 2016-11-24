import Game from "../entity/game.js";

class GameService {
  constructor() {}

  async getAll() {
    return await Game.find().exec();
  }
}

export {
  GameService as
  default
};
