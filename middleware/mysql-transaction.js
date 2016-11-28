import {
  sequelize
} from "../database.js";

export default (options = {}) => async(ctx, next) => {
  const tx = await sequelize.transaction(options);
  ctx.tx = tx;
  try {
    await next();
    await tx.commit();
  } catch (e) {
    await tx.rollback();
    throw e;  // rethrow
  }
};
