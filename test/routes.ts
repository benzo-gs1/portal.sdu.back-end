import { expect } from "chai";
import routeCollector from "@/loaders/route-collector";
import expressLoader from "@/loaders/express-loader";
import { Application } from "express";
import config from "@/config";
import axios from "axios";
import { Server } from "http";
import "reflect-metadata";

let app: Application;
let server: Server;

describe("Routes", function () {
  this.slow(120);

  this.beforeAll(function () {
    // initializing configs
    config.init();

    // loading application
    app = expressLoader();

    // loading routes
    routeCollector(app);

    server = app.listen(config.port);
  });

  it("should have collected all the routes correctly", async function () {
    const response = await axios.post(
      `http://localhost:${config.port}/api/token/test/generate`,
      { ip: "some-ip", role_level: 0, username: "some-name" }
    );

    expect(response.data.status).to.be.true;
  });

  this.afterAll(function () {
    server.close();
  });
});
