import { Schema, model } from "mongoose";
import models from "@/models/names";

const Departments = new Schema({
  _id: Schema.ObjectId,
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    en: String,
    kz: String,
    ru: String,
  },
  prefixes: [
    {
      prefix: {
        type: String,
        required: true,
      },
    },
  ],
  managers: [
    {
      _id: Schema.ObjectId,
      name: String,
    },
  ],
});

const DepartmentsModel = model(models.departments, Departments);
export default DepartmentsModel;
