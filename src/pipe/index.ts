import { EventEmitter2 } from "eventemitter2";
import Logger from "@/services/logger";

const pipe = new EventEmitter2({
  wildcard: true,
  delimiter: "::",
});

export function init() {
  pipe.on("**", function (this: any) {
    Logger.fired(this?.event as string);
  });
}

export default pipe;
