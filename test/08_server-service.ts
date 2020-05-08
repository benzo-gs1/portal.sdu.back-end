import config from "@/config";
import ServerService from "@/services/server";
import expressLoader from "@/loaders/express-loader";
import { Application } from "express";
import { Server } from "http";
import pipe from "@/pipe";
import { expect } from "chai";
import { EventNames } from "@/@types";

const slow = {
  kill: 10,
};

let app: Application;

function appFactory(app: Application): Server {
  const server = app.listen(config.port);
  config.server = server;
  return server;
}

describe("Server Service", function () {
  this.beforeAll(() => {
    config.init();

    app = expressLoader();
  });

  describe("#kill", function () {
    this.slow(slow.kill);

    it("must stop the server by method", () => {
      const server = appFactory(app);
      ServerService.closeServer(server);
      expect(server.listening).to.be.false;
    });

    it("must stop the server by event", () => {
      const server = appFactory(app);
      pipe.emit(EventNames.SERVER_CLOSE);
      expect(server.listening).to.be.false;
    });
  });
});
