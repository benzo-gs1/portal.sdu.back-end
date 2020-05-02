import { Schema, model } from "mongoose";
import models from "@/models/names";
import createSchemaRef from "@/utils/createSchemaRef";

const DepartmentsSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: Object,
  prefixes: [String],
  managers: [createSchemaRef(models.users)],
});

const DepartmentsModel = model(models.departments, DepartmentsSchema);

export { DepartmentsSchema };

export default DepartmentsModel;
