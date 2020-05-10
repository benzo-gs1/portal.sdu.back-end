import { init } from "@/loaders/db-loader";
import { IConnection } from "@/@types";

let connection: IConnection;

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

    init()
      .then((conn) => {
        connection = conn;
        connected = true;
        done();
      })
      .catch((err) => done(err))
      .finally(() => clearTimeout(id));
  });

  this.afterAll(function () {
    connection?.fast?.close();
    connection?.slow?.close();
  });
});
