import mongoose from "mongoose";
import config from "@/config";
import pipe from "@/pipe";
import events from "@/pipe/names";
import config from "@/config";

export async function init() {
  if (!config.isTesting)
    mongoose.connection.on("open", () => pipe.emit(events.mongo.connected));

  return await mongoose.connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
