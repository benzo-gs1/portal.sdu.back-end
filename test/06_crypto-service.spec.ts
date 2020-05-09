import CryptoService from "@/services/crypto";
import { expect } from "chai";

const password = "super secret";
let encrypted: string;

const slow = {
  hashPasswords: 40,
  validate: 40,
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

    it("must validate passwords properly", function () {
      expect(CryptoService.validatePasswords(password, encrypted)).to.be.true;
    });
  });
});
