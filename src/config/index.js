import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  mode: process.env.ENV_MODE,
  secret: {
    user: process.env.USER_TOKEN_SECRET
  }
};
