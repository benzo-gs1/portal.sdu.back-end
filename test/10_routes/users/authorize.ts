import DumpServer from "~/DumpServer";
import { expect } from "chai";
import { AxiosResponse } from "axios";

const name = "users/authorize";
const slow = 3000;

export default {
  name: `${name} (POST)`,
  handler: function (this: Mocha.Suite) {
    this.slow(slow);

    it("must return 412 when requirements are not met", (done) => {
      const prod = DumpServer.get("production");
      prod.postForBadBody(name, done);
    });

    it("must return 404 when user is not found", (done) => {
      const prod = DumpServer.get("production");
      prod.postForCode(name, done, 404, "error", {
        username: "tst",
        password: "test",
      });
    });

    it("must return 400 when the password is incorrect", (done) => {
      const prod = DumpServer.get("production");
      prod.postForCode(name, done, 400, "error", {
        username: "test",
        password: "tst",
      });
    });

    it("must return 200, token and user when username and passwords are valid", (done) => {
      const prod = DumpServer.get("production");
      prod.postForGood(
        name,
        done,
        (res: AxiosResponse) => {
          expect(res.status).to.be.equal(200);
          expect(res.data.data.token).not.to.be.undefined;
          expect(res.data.data.user).not.to.be.undefined;
        },
        {
          username: "test",
          password: "test",
        }
      );
    });
  },
};
