import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "en",
    enum: ["en", "ru", "kz"],
  },
  roles: [Number],
  widgets: [Number],
});

export default UserSchema;
