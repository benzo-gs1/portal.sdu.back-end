import DumpServer from "~/DumpServer";

let server: DumpServer;

const slow = 120;

describe("Route collector", function () {
  this.slow(slow);

  this.beforeAll(function () {
    server = new DumpServer();
    server.start();
  });

  it("should have collected all the routes correctly", function (done) {
    server.postForBadBody("/token/test/generate", done);
  });

  this.afterAll(function () {
    server.stop();
  });
});
