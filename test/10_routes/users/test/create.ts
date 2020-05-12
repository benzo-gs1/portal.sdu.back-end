import DumpServer from "~/DumpServer";
import { expect } from "chai";

const name = "/users/test/create";
const slow = 3000;

export default {
  name,
  handler: function (this: Mocha.Suite) {
    this.slow(slow);

    it("must be closed in production", (done) => {
      const prod = DumpServer.get("production");
      prod.postForNotFound(name, done);
    });

    it("must return 412 when requirements are not met", (done) => {
      const dev = DumpServer.get("development");
      dev.postForBadBody(name, done);
    });

    it("must return 200 when everything is ok", async () => {
      const dev = DumpServer.get("development");
      const res = await dev.post(name, {
        username: "test",
        password: "test",
        language: "en",
        role: 0,
      });

      expect(res.status).to.be.equal(200);
    });
  },
};
