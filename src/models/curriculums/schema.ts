import { Schema, mongo } from "mongoose";
import ElectivesSchema from "./electives";
import SemesterSchema from "./semester";

const CurriculumSchema = new Schema({
	title: {
		type:String,
		required: true,
	},
	year: {
		type:Number,
		required: true,
	},
	cipher: {
		type:String,
		required: true,
	},
	level: {
		type:String,
		required: true,
	},
	electives: {
		type:ElectivesSchema,
		required: true,
	},
	code: {
		type:String,
		required: true,
	},
	semester: {
		type:SemesterSchema,
		required: true,
	}
});

export default CurriculumSchema;
