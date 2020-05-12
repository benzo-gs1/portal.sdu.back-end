import CryptoService from "@/services/crypto";
import { expect } from "chai";

const password = "super secret";
let encrypted: string;

const slow = {
  hashPasswords: 40,
  validate: 60,
};

describe("Crypto Service", function () {
  describe("#hashPasswords", function () {
    this.slow(slow.hashPasswords);

    it("must hash passwords", () => {
      encrypted = CryptoService.hashPassword(password);
      expect(encrypted).not.to.be.undefined;
    });
  });

  describe("#validatePasswords", function () {
    this.slow(slow.validate);

    it("must return true when password is valid", function () {
      expect(CryptoService.validatePasswords(password, encrypted)).to.be.true;
    });

    it("must return false when passwords are not matching", function () {
      expect(CryptoService.validatePasswords(password + "1", encrypted)).to.be.false;
    });

    it("must pass custom passwords test", function () {
      const password = CryptoService.hashPassword("test");
      expect(CryptoService.validatePasswords("tst", password)).to.be.false;
    });
  });
});
