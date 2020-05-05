import routeCollector from "./route-collector";
import serviceCollector from "./service-collector";
import expressLoader from "./express-loader";
import pipe from "@/pipe";
import { logger } from "@/middleware";
import Logger from "@/services/logger";
import { init as pipeInit } from "@/pipe";
import config from "@/config";
import { init as dbInit } from "./db-loader";
import { IConnection, EventNames } from "@/@types";

export default class Loaders {
  static async init(args: string[]) {
    // initializing configs
    Logger.log("Configs initializing....");
    config.init();
    Logger.log("Configs Done");

    // initializing event-pipe
    Logger.log("EventPipe initializing....");
    pipeInit();
    Logger.log("EventPipe Done");

    pipe.emit(EventNames.SERVER_SETUP);

    // initializing mongodb connection
    Logger.log("MongoDB initializing....");
    const connection: IConnection = await dbInit();
    Logger.log("MongoDB Done");

    // initializing express & middleware plugins
    Logger.log("Express initializing....");
    const app = expressLoader();
    Logger.log("Express Done");

    // collecting services
    Logger.log("Services initializing....");
    serviceCollector();
    Logger.log("Services Done");

    // collecting routes
    Logger.log("Routes initializing....");
    app.use("/api", logger(), routeCollector("routes"));
    Logger.log("Routes Done");

    return { app, connection };
  }
}
