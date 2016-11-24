const db = require("../database.js");

const transaction = (options={}) => async(ctx, next) => {
  const tx = await db.seq.transaction(options);
  ctx.tx = tx;
  try {
    await next();
    await tx.commit();
  } catch (e) {
    console.log(e);
    await tx.rollback();
  }
};

module.exports = transaction;
