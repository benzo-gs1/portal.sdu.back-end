import { expect } from "chai";
import config from "@/config";

// test in production
const isProduction: boolean = process.argv[2] === "--production";

describe("Configurations", function () {
  // 10ms consider as slow
  this.slow(10);

  beforeEach(function () {
    config.init();
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

  it("must have ignoredRoutes defined", function () {
    expect(config.ignoredRoutes).not.to.be.undefined;
  });

  it("must have test.js as ignored route", function () {
    expect(config.ignoredRoutes).contain("test.js");
  });
});
