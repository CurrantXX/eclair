import {
  sequelize
} from "../database.js";

const transaction = (options = {}) => async(ctx, next) => {
  const tx = await sequelize.transaction(options);
  ctx.tx = tx;
  try {
    await next();
    await tx.commit();
  } catch (e) {
    console.log(e);
    await tx.rollback();
  }
};

export {
  transaction as
  default
};
