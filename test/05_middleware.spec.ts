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

const slow = {
  protected: 10,
  test: 10,
};

describe("Middleware", function () {
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

  describe("@Protected", function () {
    this.slow(slow.protected);

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
      const options = {
        headers: {
          Authorization: "Bearer fake.token.really",
        },
      };
      axios
        .post(point, {}, options)
        .then(() => done("Error"))
        .catch((err) => {
          expect(err.response.status).to.be.equal(403);
          expect(err.response.data?.status).to.be.false;
          done();
        });
    });
  });

  describe("@Test", function () {
    this.slow(slow.test);

    it("should not collect in production, so 404 will return", function (done) {
      axios
        .post(`http://localhost:${config.port}/api/token/test/generate`)
        .then(() => done("Error"))
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
  });

  this.afterAll(function () {
    server.close();
  });
});
