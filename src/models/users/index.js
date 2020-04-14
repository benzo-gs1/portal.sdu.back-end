import { Schema, model } from "mongoose";

const Users = new Schema({
  _id: Schema.ObjectId,
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
  },
  department:{
    type: Schema.ObjectId,
    
  },
  faculty:{
    type: Schema.ObjectId,
    
  },
  curriculum:{
    type: Schema.ObjectId,
    
  },

});

const UsersModel = model("users", Users);

export default UsersModel;
