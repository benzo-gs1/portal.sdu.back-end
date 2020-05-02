import { Schema } from "mongoose";
import models from "@/models/names";
import createSchemaRef from "@/utils/createSchemaRef";

const CoursesSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    default: "en",
  },
  title: Object,
  department: createSchemaRef(models.departments),
  hours: {
    theory: Number,
    practice: Number,
    labs: Number,
  },
  credits: {
    type: Number,
    required: true,
  },
  ects: {
    type: Number,
    required: true,
  },
});

export default CoursesSchema;
