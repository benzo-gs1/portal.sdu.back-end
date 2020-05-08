import CryptoService from "@/services/crypto";
import { expect } from "chai";

const password = "super secret";

// TODO describe exact functions
describe("Crypto Service", function () {
  this.slow(100);
  it("must hash passwords", () => {
    expect(CryptoService.hashPassword(password)).not.to.be.undefined;
  });

  it("must validate passwords properly", function () {
    const encrypted = CryptoService.hashPassword(password);
    expect(CryptoService.validatePasswords(password, encrypted)).to.be.true;
  });
});
