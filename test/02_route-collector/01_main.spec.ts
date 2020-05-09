import { expect } from "chai";
import DumpServer from "~/DumpServer";

let server: DumpServer;

const slow = 120;

describe("Route collector", function () {
  this.slow(slow);

  this.beforeAll(function () {
    server = new DumpServer();
    server.start();
  });

  it("should have collected all the routes correctly", async function () {
    const response = await server.post("/token/test/generate", {
      ip: "some-ip",
      role_level: 0,
      username: "some-name",
    });

    expect(response.data.status).to.be.true;
  });

  this.afterAll(function () {
    server.stop();
  });
});
