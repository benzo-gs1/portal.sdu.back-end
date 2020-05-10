import DumpServer from "~/DumpServer";
import { expect } from "chai";
import TokenService from "@/services/token";
import testRole from "@/services/role/roles/test";

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
      testRole.actions.push("/api/*");

      const token = TokenService.create({
        ip: "::ffff:127.0.0.1",
        role_level: 0,
        username: "test",
      }) as string;
      const response = await dev.post(name, {}, token);
      expect(response.status).to.be.equal(200);
    });
  },
};
