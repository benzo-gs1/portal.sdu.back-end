import { init } from "@/loaders/db-loader";
import { IConnection } from "@/@types";

let connection: IConnection;
const timeout = 15000;

describe("Database loader", function () {
  this.slow(10000);
  this.timeout(timeout);

  it("must have connection", function (done) {
    init()
      .then((conn) => {
        connection = conn;
        done();
      })
      .catch((err) => done(err));
  });

  this.afterAll(function () {
    connection?.fast?.close();
    connection?.slow?.close();
  });
});
