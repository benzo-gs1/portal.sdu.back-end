import { Schema, mongo } from "mongoose";

const Department = new Schema({
	name: {
		type: String,
		required: true,
	},
	department: {
		type: new mongo.ObjectID(),
		required: true,
	}
});

export default Department;
