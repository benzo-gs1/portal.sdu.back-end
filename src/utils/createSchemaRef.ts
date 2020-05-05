import { Schema } from "mongoose";
import { ModelNames } from "@/@types";

export default function createSchemaRef(targetModel: ModelNames) {
  return {
    type: Schema.Types.ObjectId,
    ref: targetModel,
  };
}
