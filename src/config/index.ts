import { config } from "dotenv";
import Logger from "@/services/logger";
import { IConfig } from "@/@types/config";

function setConfig(key: string, value: any) {
  if (key && value) {
    if (!configs.isTesting) {
      Logger.log(
        `Configuration update at ${key} by: ${typeof configs[key]} --> ${typeof value}`
      );
    }

    configs[key] = value;
  }
}

function init() {
  config();

  setConfig("port", process.env.PORT ? +process.env.PORT : 3000);
  setConfig("isProduction", process.env.NODE_ENV === "production");
  setConfig("secretKey", process.env.USER_TOKEN_SECRET);
  setConfig("secretAlgorithm", process.env.TOKEN_ALGORITHM);
  setConfig("mongodbUri", process.env.MONGODB_URI);
}

const configs: IConfig = {
  port: 3000,
  isProduction: false,
  secretAlgorithm: "HS256",
  secretKey: "",
  mongodbUri: "",
  ignoredRoutes: ["test.js"],
  isTesting: process.argv[1]?.includes("mocha"),
  setConfig,
  init,
};

export default configs;
