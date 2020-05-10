import DumpServer from "~/DumpServer";
import server from "./server";

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

    productionServer.start();
    developmentServer.start();

    DumpServer.register("production", productionServer);
    DumpServer.register("development", developmentServer);
  });

  describe("Server routes", function () {
    const routes = server;

    for (const route of routes) {
      describe(route.name, route.handler);
    }
  });

  this.afterAll(() => {
    productionServer.stop();
    developmentServer.stop();

    DumpServer.unregister("production");
    DumpServer.unregister("development");
  });
});
