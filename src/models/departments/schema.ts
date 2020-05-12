import { Schema, mongo } from "mongoose";
import ManagerSchema from "./manager";
import TitleSchema from "./title";

const DepartmentSchema = new Schema({
	title: {
		type:TitleSchema,
		required: true,
	},
	prefixes: [String],
	managers: [ManagerSchema],
	curriculums: {
		type:new mongo.ObjectID(),
		required: true,
	},
});

export default DepartmentSchema;
