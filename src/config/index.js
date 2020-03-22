import { config } from "dotenv";
import pipe from "@/pipe";

pipe.on("system::setup", () => {
  console.info("| Configs ready");
});

const configs = {
  port: 3000,
  isProduction: false,
  secret: {
    user: "default",
    algorithm: "HS256"
  },
  mongodb: {
    uri: ""
  }
};

export function setConfig(key, value) {
  if (key && value) configs[key] = value;
}

export function init() {
  config();

  setConfig("port", +process.env.PORT);
  setConfig("isProduction", process.env.ENV_MODE !== "dev");
  setConfig("user", process.env.USER_TOKEN_SECRET);
  setConfig("secret", { algorithm: process.env.TOKEN_ALGORITHM });
  setConfig("secret", { uri: process.env.MONGODB_URI });
}

export default configs;
