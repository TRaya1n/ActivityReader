const start = Date.now();
import chalk from "chalk";
import moment from "moment";
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);

function getTime() {
  return moment().utcOffset(+5).format("DD:HH:mm:ss");
}

__require("./src/client.ts")(start);
