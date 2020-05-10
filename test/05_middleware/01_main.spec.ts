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
      server.postForCode("/token/validate", done, 401, "error");
    });

    it("should send 403 response with status false when token is not valid", function (done) {
      server.postForCode("/token/validate", done, 403, "error", {}, "fake.token.really");
    });
  });

  describe("@Test", function () {
    this.slow(slow.test);

    it("should not collect in production, so 404 will return", function (done) {
      server.postForNotFound("/token/test/generate", done);
    });
  });

  this.afterAll(function () {
    server.stop();
  });
});
