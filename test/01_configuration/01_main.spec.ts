import { expect } from "chai";
import config from "@/config";
import DumpServer from "~/DumpServer";

// test in production
const isProduction: boolean = process.argv[2] === "--production";

const slow = 2;

describe("Configurations", function () {
  this.slow(slow);

  this.beforeAll(function () {
    config.init();
    DumpServer.enableTestMode();
  });

  describe("#setConfig()", function () {
    it("must set config property", function () {
      config.setConfig("test", 5);
      expect(config.test).to.be.equal(5);
    });
  });

  if (isProduction) {
    it("must have a proper secret key", function () {
      expect(config.secretKey).not.to.be.equal("super_secret_test_key");
    });
    it("must have production mode enabled", function () {
      expect(config.isProduction).to.be.true;
    });
  }

  it("must have mongodbURI defined", function () {
    expect(config.mongodbUri).not.to.be.undefined;
  });
});
