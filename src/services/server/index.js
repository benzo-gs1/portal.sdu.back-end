import pipe from "@/pipe";
import config from "@/config";

pipe.on("server::close", () => {
  ServerService.closeServer(config.server);
});

export default class ServerService {
  static closeServer(server) {
    server?.close();
  }
}
