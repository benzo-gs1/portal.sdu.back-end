import { config } from "dotenv";

let configs = {
  port: 3000,
  isProduction: false,
  secret: {
    user: "default",
    algorithm: "HS256"
  }
};

export function init() {
  config();

  configs = {
    port: +process.env.PORT,
    isProduction: process.env.ENV_MODE !== "dev",
    secret: {
      user: process.env.USER_TOKEN_SECRET,
      algorithm: process.env.TOKEN_ALGORITHM
    }
  };
}

export default configs;
