import { EventEmitter2 } from "eventemitter2";

const pipe = new EventEmitter2({
  wildcard: true,
  delimiter: "::"
});

export function init() {
  
}

export default pipe;
