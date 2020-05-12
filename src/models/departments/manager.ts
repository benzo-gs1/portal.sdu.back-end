import { Schema } from "mongoose";

const ManagerSchema = new Schema({
  fullName: {
		type:String,
		required: true,
	},
});

export default ManagerSchema;
