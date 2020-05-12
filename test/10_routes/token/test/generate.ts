import DumpServer from "~/DumpServer";

const name = "/token/test/generate";
const slow = 20;

export default {
  name: `${name} (POST)`,
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

    it("must return 200 when everything is ok", (done) => {
      const dev = DumpServer.get("development");
      dev.postForOk(name, done, {
        roles: [0],
        username: "test-username",
      });
    });
  },
};
