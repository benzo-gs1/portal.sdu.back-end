import { Schema, model } from "mongoose";

const Users = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: "en"
  }
});

const UsersModel = model("users", Users);

export default UsersModel;
