import { ModelNames, IModel } from "@/@types";
import { Schema, Document, Model } from "mongoose";
import config from "@/config";

export default <T extends Document>(name: ModelNames, schema: Schema): IModel<T> => {
  return {
    slow: config.mongoConnection?.slow.model<T>(name, schema) as Model<T>,
    fast: config.mongoConnection?.slow.model<T>(name, schema) as Model<T>,
  };
};
