import pipe from "@/pipe";
import config from "@/config";
import Logger from "@/services/logger";

class ServerService {
  static closeServer(server) {
    server?.close();
  }
}

pipe.on("server::close", () => {
  Logger.handled("server::close", "Server Service", "closing server...");
  ServerService.closeServer(config.server);
});

export default ServerService;
