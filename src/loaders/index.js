import routeCollector from "./route-collector";
import expressLoader from "./express-loader";
import { init as pipeInit } from "@/pipe";
import { init as configsInit } from "@/config";

export default class Loaders {
  static async init(args) {
    // initializing configs
    configsInit();

    // initializing event-pipe
    pipeInit();

    // initializing express & middleware plugins
    const app = await expressLoader();

    // collecting routes
    app.use("/api", await routeCollector("routes"));

    return { app };
  }
}
