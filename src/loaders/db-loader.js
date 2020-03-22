import mongoose from "mongoose";
import config from "@/config";
import pipe from "@/pipe";

export async function init() {
  await mongoose.connect(config.mongodb.uri);

  mongoose.connection.on("open", () => {
    pipe.emit("mongo::connected");
  });
}
