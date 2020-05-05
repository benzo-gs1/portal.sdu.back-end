import pipe from "@/pipe";
import config from "@/config";
import Logger from "@/services/logger";
import { Server } from "http";

class ServerService {
  static closeServer(server: Server) {
    server?.close();
  }
}

pipe.on(EventNames.SERVER_CLOSE, () => {
  Logger.handled(EventNames.SERVER_CLOSE, "Server Service", "closing server...");
  if (config.server) ServerService.closeServer(config.server);
});

export default ServerService;
