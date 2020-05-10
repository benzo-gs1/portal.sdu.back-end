import ServerService from "@/services/server";
import { expect } from "chai";
import DumpServer from "~/DumpServer";
import { Server } from "http";

const slow = {
  kill: 10,
};

let server: DumpServer;

describe("Server Service", function () {
  this.beforeAll(() => {
    server = new DumpServer({ withoutRoutes: true });
  });

  describe("#kill", function () {
    this.slow(slow.kill);
    this.beforeEach(() => server.restart());

    it("must stop the server by method", () => {
      ServerService.closeServer(server.instance as Server);
      expect(server.listening).to.be.false;
    });
  });
});
