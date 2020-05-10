import DumpServer from "~/DumpServer";
import { expect } from "chai";
import { AxiosResponse } from "axios";

const slow = 10;

export default function (this: Mocha.Suite) {
  this.slow(slow);

  it("must be closed in production", (done) => {
    const prod = DumpServer.get("production");

    prod.postForError("/server/test/kill", done, (res: AxiosResponse) => {
      expect(res.status).to.be.equal(404);
    });
  });
}
