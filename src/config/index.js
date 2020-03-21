import { config } from "dotenv";

config();

export default {
  port: +process.env.PORT,
  isProduction: process.env.ENV_MODE !== "dev",
  secret: {
    user: process.env.USER_TOKEN_SECRET,
    algorithm: process.env.TOKEN_ALGORITHM
  }
};
