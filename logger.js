import Winston from "winston";
import config from "./config.js";

const transports = [];

for (const transport of config.log.transports) {
  switch (transport.type) {
    case "file":
      transports.push(new Winston.transports.File(transport));
      break;
    case "console":
      transports.push(new Winston.transports.Console(transport));
      break;
    default:
  }
}

export default new Winston.Logger({
  transports: transports
});
