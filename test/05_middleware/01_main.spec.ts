import { expect } from "chai";
import DumpServer from "~/DumpServer";

let server: DumpServer;

const slow = {
  protected: 10,
  test: 10,
};

describe("Middleware", function () {
  this.beforeAll(function () {
    server = new DumpServer({ isProduction: true });
    server.start();
  });

  describe("@Protected", function () {
    this.slow(slow.protected);

    it("should send 401 response with status false when no token present", function (done) {
      server
        .post("/token/validate")
        .then(() => done("Error"))
        .catch((err) => {
          expect(err.response.status).to.be.equal(401);
          expect(err.response.data?.status).to.be.false;
          done();
        });
    });

    it("should send 403 response with status false when token is not valid", function (done) {
      server
        .post("/token/validate", {}, "fake.token.really")
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
      server
        .post("/token/test/generate")
        .then(() => done("Error"))
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });
  });

  this.afterAll(function () {
    server.stop();
  });
});
