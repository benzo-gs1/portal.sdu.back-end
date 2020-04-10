import pipe from "@/pipe";
import config from "@/config";

class ServerService {
  static closeServer(server) {
    server?.close();
  }
}

pipe.on("server::close", () => {
  ServerService.closeServer(config.server);
});

export default ServerService;
