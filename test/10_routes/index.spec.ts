import DumpServer from "~/DumpServer";
import serverRoutes from "./server";

let productionServer: DumpServer;
let developmentServer: DumpServer;

describe("Routes", function () {
  this.beforeAll(() => {
    productionServer = new DumpServer({
      port: 3010,
      isProduction: true,
    });
    developmentServer = new DumpServer({
      port: 3020,
      isProduction: false,
    });
  });

  describe("Server routes", serverRoutes(productionServer, developmentServer).bind(this));
});
