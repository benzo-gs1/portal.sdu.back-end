import routeCollector from "./route-collector";
import expressLoader from "./express-loader";
import pipe from "@/pipe";

export default class Loaders {
  static async init(config) {
    const app = await expressLoader();

    app.use("/api", await routeCollector("routes"));

    return { app };
  }
}
