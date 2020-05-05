import mongoose from "mongoose";
import config from "@/config";
import pipe from "@/pipe";
import events from "@/pipe/names";

export async function init() {
  if (!config.isTesting) {
    mongoose.connection.on("open", () => pipe.emit(events.mongo.connected));
  }

  // use poolSize of 10 in production and 1 in development
  const poolSize = config.isProduction ? 10 : 1;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
    poolSize,
  };
  return {
    slow: await mongoose.createConnection(config.mongodbUri, options),
    fast: await mongoose.createConnection(config.mongodbUri, options),
  };
}
