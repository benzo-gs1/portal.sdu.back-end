import { Schema, mongo } from "mongoose";
import ElectivesSchema from "./electives";

const SemesterSchema = new Schema({
	index: {
		type:Number,
		required: true,
	},
	courses: {
		type:new mongo.ObjectID(),
		required: true,
	},
	group: {
		type: [ElectivesSchema],
		required: true,
	},
});

export default SemesterSchema;
