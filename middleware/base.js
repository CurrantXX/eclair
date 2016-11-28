export default (options = {}) = async(ctx, next) => {
  try {
    await next();
  } catch (e) {
    const message = e.message;
    if ("message" in message && "status" in message) {
      // show bad request
    } else {
      //
    }
  }
};
