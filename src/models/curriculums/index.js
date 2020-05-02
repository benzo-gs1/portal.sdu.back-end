import { Schema } from "mongoose";
import models from "@/models/names";
import createSchemaRef from "@/utils/createSchemaRef";

const CurriculumsSchema = new Schema({
  semesters: [
    {
      index: Number,
      courses: [createSchemaRef(models.courses)],
      electives: [[createSchemaRef(models.courses)]],
    },
  ],
  year: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  cipher: {
    type: Number,
    required: true,
    unique: true,
  },
  title: Object,
  language: {
    type: String,
    default: "en",
  },
  department: createSchemaRef(models.departments),
  level: {
    short: String,
    full: Object,
  },
});

export default CurriculumsSchema;
