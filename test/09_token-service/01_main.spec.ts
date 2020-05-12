import TokenService from "@/services/token";
import { expect } from "chai";
import { ITokenData } from "@/@types";

const FAKE_TOKEN_DATA: ITokenData = {
  ip: "some-ip",
  roles: [0],
  username: "some-username",
};
const AUTHORIZATION_HEADER = "Bearer some-token";
const slow = {
  create: 20,
  validate: 30,
  bearerParser: 2,
};
let token: string;

describe("Token Service", function () {
  describe("#create", function () {
    this.slow(slow.create);

    it("must create token", () => {
      token = TokenService.create(FAKE_TOKEN_DATA) as string;
      expect(token).not.to.be.false;
    });
  });

  describe("#validate", function () {
    this.slow(slow.validate);

    it("must validate proper token", () => {
      const result = TokenService.validate(token);
      expect(result).not.to.be.false;
    });

    it("must return false for bad data", () => {
      const result = TokenService.validate("");
      expect(result).to.be.false;
    });
  });

  describe("#bearerParser", function () {
    this.slow(slow.bearerParser);

    it("must parse authorization header (Bearer)", () => {
      const result = TokenService.bearerParser(AUTHORIZATION_HEADER);
      expect(result).to.be.string("some-token");
    });

    it("must not parse authorization header (w/o Bearer)", () => {
      const result = TokenService.bearerParser(
        AUTHORIZATION_HEADER.replace("Bearer ", "")
      );
      expect(result).to.be.false;
    });

    it("must not parse authorization header (empty)", () => {
      const result = TokenService.bearerParser("");
      expect(result).to.be.false;
    });
  });
});
