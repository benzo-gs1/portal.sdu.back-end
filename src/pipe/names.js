import { deepFreeze } from "@/utils";

export default deepFreeze({
  server: {
    close: "server::close",
    setup: "server::setup",
  },
  mongo: {
    connected: "mongo::connected",
  },
});
