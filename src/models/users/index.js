import { Schema } from "mongoose";
import models from "@/models/names";
import createSchemaRef from "@/utils/createSchemaRef";

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [
    {
      name: String,
      level: Number,
    },
  ],
  language: {
    type: String,
    default: "en",
  },
  department: createSchemaRef(models.departments),
  faculty: createSchemaRef(models.faculties),
  curriculum: createSchemaRef(models.curriculums),
});

export default UsersSchema;
