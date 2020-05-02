import { expect } from "chai";
import config from "../src/config";
import { init } from "../src/config";

// test in production
const isProduction = process.argv[2] === "--production";

describe("Configurations", () => {
  beforeEach(function () {
    init();
  });

  describe("#setConfig()", function () {
    it("must set config property", function () {
      config.setConfig("test", 5);
      expect(config.test).to.be.equal(5);
    });
  });

  if (isProduction) {
    it("must have a proper secret key", () => {
      expect(config.secretKey).not.to.be.equal("super_secret_test_key");
    });
    it("must have production mode enabled", () => {
      expect(config.isProduction).to.be.true;
    });
  }
});
