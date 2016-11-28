import Sequelize from "sequelize";
import {
  sequelize
} from "../database.js";

export default sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  paranoid: true
});
