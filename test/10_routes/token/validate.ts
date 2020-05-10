import DumpServer from "~/DumpServer";
import { expect } from "chai";

const slow = 20;
const name = "/token/validate";

export default {
  name,
  handler: function (this: Mocha.Suite) {
    this.slow(slow);

    it("must be protected by token", (done) => {
      const dev = DumpServer.get("development");
      dev.postForProtected(name, done);
    });

    it("must return 200 for valid token", async () => {
      const dev = DumpServer.get("development");
      const response = await dev.post(name, {}, "");
      expect(response.status).to.be.equal(200);
    });
  },
};
