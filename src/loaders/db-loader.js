import mongoose from "mongoose";
import configs from "@/config";
import pipe from "@/pipe";
import events from "@/pipe/names";

export async function init() {
  if (!configs.isTesting) {
    mongoose.connection.on("open", () => pipe.emit(events.mongo.connected));
  }

  // use poolSize of 10 in production and 1 in development
  const poolSize = configs.isProduction ? 10 : 1;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
    poolSize,
  };
  return {
    slow: await mongoose.createConnection(configs.mongodbUri, options),
    fast: await mongoose.createConnection(configs.mongodbUri, options),
  };
}
