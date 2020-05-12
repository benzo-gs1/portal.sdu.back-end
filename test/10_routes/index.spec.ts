import DumpServer from "~/DumpServer";
import server from "./server";
import token from "./token";
import users from "./users";

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
  {
    name: "Users routes",
    routes: users,
  },
];

describe("Routes", function () {
  this.timeout(10000);

  this.beforeAll(async () => {
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

    DumpServer.stopConnection();
  });
});
