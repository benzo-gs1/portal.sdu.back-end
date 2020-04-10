require("dotenv").config();
const expect = require("chai").expect;
const dbLoader = require("../src/loaders/db-loader");

const isProduction = process.argv[2] === "--production";

describe("Configurations", () => {
  if (isProduction)
    it("must have a proper secret key", () => {
      expect(process.env.USER_TOKEN_SECRET).not.to.be.equal("super_secret_test_key");
    });

  if (isProduction)
    it("must have production mode enabled", () => {
      expect(process.env.ENV_MODE).to.be.equal("prod");
    });
});

describe("Database connection", () => {
  it("must have mongodb uri", () => {
    expect(process.env.MONGODB_URI).not.to.be.undefined;
  });

  it("must have connection to the database", () => {});
});
