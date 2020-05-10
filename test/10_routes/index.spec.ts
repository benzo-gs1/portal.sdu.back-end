import DumpServer from "~/DumpServer";
import server from "./server";
import token from "./token";

let productionServer: DumpServer;
let developmentServer: DumpServer;

const tests = [
  {
    name: "Server routes",
    routes: server,
  },
  {
    name: "Token routes",
    routes: token,
  },
];

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

  for (const test of tests) {
    describe(test.name, function () {
      for (const route of test.routes) {
        describe(route.name, route.handler);
      }
    });
  }

  this.afterAll(() => {
    productionServer.stop();
    developmentServer.stop();

    DumpServer.unregister("production");
    DumpServer.unregister("development");
  });
});
