import { EventEmitter2 } from "eventemitter2";

const pipe = new EventEmitter2({
  wildcard: true,
  delimiter: "::"
});

pipe.on("system::setup", () => {
  console.info("| Event pipe ready");
});

export function init() {
  pipe.emit("system::setup");
}

export default pipe;
