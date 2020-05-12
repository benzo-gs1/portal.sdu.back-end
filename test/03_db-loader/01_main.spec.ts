import DumpServer from "~/DumpServer";

const slow = 5000;
const timeout = slow * 2;

describe("Database loader", function () {
  this.slow(slow);
  this.timeout(timeout);

  it("must have connection", function (done) {
    let connected = false;

    const id = setTimeout(() => {
      if (!connected) done("No connection established");
    }, timeout);

    DumpServer.startConnection()
      .then(() => {
        connected = true;
        done();
      })
      .catch((err) => done(err))
      .finally(() => clearTimeout(id));
  });
});
