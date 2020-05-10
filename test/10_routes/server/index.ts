import DumpServer from "~/DumpServer";

const slow = {
  test: {
    kill: 5,
  },
};

export default (prod: DumpServer, dev: DumpServer) => {
  return function suite(this: Mocha.Suite) {
    describe("/server/test/kill", function () {
      this.slow(slow.test.kill);

      it("must be closed in production", (done) => {});
    });
  };
};
