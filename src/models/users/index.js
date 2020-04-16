import { Schema, model } from "mongoose";
import models from "@/models/names";

const ObjectId = Schema.Types.ObjectId;

const Users = new Schema({
  _id: ObjectId,
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
  department: ObjectId,
  faculty: ObjectId,
  curriculum: ObjectId,
});

const UsersModel = model(models.users, Users);

export default UsersModel;
