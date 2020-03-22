import routeCollector from "./route-collector";
import serviceCollector from "./service-collector";
import expressLoader from "./express-loader";
import pipe from "@/pipe";
import { init as pipeInit } from "@/pipe";
import { init as configsInit } from "@/config";
import { init as dbInit } from "./db-loader";

export default class Loaders {
  static async init(args) {
    // initializing configs
    configsInit();

    // initializing event-pipe
    pipeInit();

    // initializing mongodb connection
    await dbInit();

    // initializing express & middleware plugins
    const app = await expressLoader();

    // collecting services
    await serviceCollector();

    // collecting routes
    app.use("/api", await routeCollector("routes"));

    pipe.emit("system::setup");

    return { app };
  }
}
