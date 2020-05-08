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
let point: string;

describe("Route collector", function () {
  this.slow(120);

  this.beforeAll(function () {
    // initializing configs
    config.init();
    config.isTesting = true;
    config.isProduction = true;

    // loading application
    app = expressLoader();

    // loading routes
    routeCollector(app);

    server = app.listen(config.port);
    point = `http://localhost:${config.port}/api/token/validate`;
  });

  it("should send 401 response with status false when no token present", function (done) {
    axios
      .post(point)
      .then(() => done("Error"))
      .catch((err) => {
        expect(err.response.status).to.be.equal(401);
        expect(err.response.data?.status).to.be.false;
        done();
      });
  });

  it("should send 403 response with status false when token is not valid", function (done) {
    axios
      .post(
        point,
        {},
        {
          headers: {
            Authorization: "Bearer fake.token.really",
          },
        }
      )
      .then(() => done("Error"))
      .catch((err) => {
        expect(err.response.status).to.be.equal(403);
        expect(err.response.data?.status).to.be.false;
        done();
      });
  });

  it("should not collect @Test annotations, so 404 will return", function (done) {
    axios
      .post(`http://localhost:${config.port}/api/token/test/generate`)
      .then(() => done("Error"))
      .catch((err) => {
        expect(err.response.status).to.be.equal(404);
        done();
      });
  });

  this.afterAll(function () {
    server.close();
  });
});
