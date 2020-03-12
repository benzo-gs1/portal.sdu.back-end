import routeCollector from "./route-collector";
import expressLoader from "./express-loader";

export default class Loaders {
  static async init(config) {
    const app = await expressLoader();

    if (config.mode) app.use("/api", await routeCollector("dist/routes"));
    else app.use("/api", await routeCollector("src/routes"));

    return { app };
  }
}
