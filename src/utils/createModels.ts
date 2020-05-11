import { ModelNames, IModel } from "@/@types";
import { Schema, Document, Model } from "mongoose";
import config from "@/config";

const { mongoConnection } = config;

export default <T extends Document>(name: ModelNames, schema: Schema): IModel<T> => {
  return {
    slow: mongoConnection?.slow.model(name, schema) as Model<T>,
    fast: mongoConnection?.slow.model(name, schema) as Model<T>,
  };
};
