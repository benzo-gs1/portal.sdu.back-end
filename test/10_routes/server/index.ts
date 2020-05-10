import DumpServer from "~/DumpServer";

export default (prod: DumpServer, dev: DumpServer) => {
  return function suite(this: Mocha.Suite) {};
};
