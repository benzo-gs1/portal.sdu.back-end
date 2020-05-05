import { Schema } from "mongoose";

export default function createSchemaRef(targetModel: ModelNames) {
  return {
    type: Schema.Types.ObjectId,
    ref: targetModel,
  };
}
