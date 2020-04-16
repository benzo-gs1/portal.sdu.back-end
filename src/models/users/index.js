import { Schema, model } from "mongoose";
import models from "@/models/names";

const Users = new Schema({
  _id: Schema.ObjectId,
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
  role: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "en",
  },
  department: {
    type: Schema.Types.ObjectId,
  },
  faculty: {
    type: Schema.Types.ObjectId,
  },
  curriculum: {
    type: Schema.Types.ObjectId,
  },
});

const UsersModel = model(models.users, Users);

export default UsersModel;
