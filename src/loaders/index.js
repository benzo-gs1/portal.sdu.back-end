import routeCollector from "./route-collector";
import expressLoader from "./express-loader";

export default class Loaders {
  static async init(config) {
    const app = await expressLoader();

    app.use("/api", await routeCollector("routes"));

    return { app };
  }
}
