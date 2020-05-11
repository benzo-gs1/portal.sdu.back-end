import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default UserSchema;
