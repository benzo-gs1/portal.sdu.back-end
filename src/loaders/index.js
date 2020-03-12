import routeCollector from "./route-collector";
import expressLoader from "./express-loader";

export default class Loaders {
  static async init() {
    const app = await expressLoader();

    

    return { app };
  }
}
