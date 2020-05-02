import { config } from "dotenv";
import Logger from "@/services/logger";

const configs = {
  port: 3000,
  isProduction: false,
  secretAlgorithm: "HS256",
  secretKey: "",
  mongodbUri: "",
  ignoredRoutes: ["test.js"],
  isTesting: process.argv[1]?.includes("mocha"),
};

export function setConfig(key, value) {
  if (key && value) {
    if (!configs.isTesting)
      Logger.log(
        `Configuration update at ${key} by: ${typeof configs[
          key
        ]} --> ${typeof value}`
      );

    configs[key] = value;
  }
}

export function init() {
  config();

  setConfig("port", +process.env.PORT);
  setConfig("isProduction", process.env.NODE_ENV === "production");
  setConfig("secretKey", process.env.USER_TOKEN_SECRET);
  setConfig("secretAlgorithm", process.env.TOKEN_ALGORITHM);
  setConfig("mongodbUri", process.env.MONGODB_URI);
}

export default configs;
