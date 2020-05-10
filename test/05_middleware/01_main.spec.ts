import { expect } from "chai";
import DumpServer from "~/DumpServer";
import { AxiosResponse } from "axios";

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
      server.postForError("/token/validate", done, (res: AxiosResponse) => {
        expect(res.status).to.be.equal(401);
        expect(res.data?.status).to.be.false;
      });
    });

    it("should send 403 response with status false when token is not valid", function (done) {
      server.postForError(
        "/token/validate",
        done,
        (res: AxiosResponse) => {
          expect(res.status).to.be.equal(403);
          expect(res.data?.status).to.be.false;
        },
        {},
        "fake.token.really"
      );
    });
  });

  describe("@Test", function () {
    this.slow(slow.test);

    it("should not collect in production, so 404 will return", function (done) {
      server.postForError("/token/test/generate", done, (res: AxiosResponse) => {
        expect(res.status).to.be.equal(404);
      });
    });
  });

  this.afterAll(function () {
    server.stop();
  });
});
