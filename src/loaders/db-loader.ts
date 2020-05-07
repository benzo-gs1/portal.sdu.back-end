import mongoose from "mongoose";
import config from "@/config";
import pipe from "@/pipe";
import { EventNames } from "@/@types";

export async function init() {
  // use poolSize of 10 in production and 1 in development
  const poolSize = config.isProduction ? 10 : 1;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
    poolSize,
  };

  const connection = {
    slow: await mongoose.createConnection(config.mongodbUri, options),
    fast: await mongoose.createConnection(config.mongodbUri, options),
  };

  pipe.emit(EventNames.MONGO_CONNECTED);
  return connection;
}
