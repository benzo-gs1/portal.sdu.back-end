import pipe from "@/pipe";
import config from "@/config";
import Logger from "@/services/logger";
import { Server } from "http";
import { EventNames } from "@/@types";
import { LogOnError } from "@/utils";

class ServerService {
  @LogOnError
  static closeServer(server: Server) {
    server?.close();
  }
}

pipe.on(EventNames.SERVER_CLOSE, () => {
  Logger.handled(EventNames.SERVER_CLOSE, "Server Service", "closing server...");
  if (config.server) ServerService.closeServer(config.server);
});

export default ServerService;
