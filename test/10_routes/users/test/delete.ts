import DumpServer from "~/DumpServer";
import { expect } from "chai";

const name = "/users/test/delete";
const slow = 3000;

export default {
  name,
  handler: function (this: Mocha.Suite) {
    this.slow(slow);

    it("must be closed in production", (done) => {
      const prod = DumpServer.get("production");
      prod.deleteForNotFound(name, done);
    });

    it("must return 412 when requirements are not met", (done) => {
      const dev = DumpServer.get("development");
      dev.deleteForBadBody(name, done);
    });

    it("must return 200 when test user is deleted", async () => {
      const dev = DumpServer.get("development");
      const res = await dev.delete(name, {
        username: "test",
      });

      expect(res.status).to.be.equal(200);
    });
  },
};
