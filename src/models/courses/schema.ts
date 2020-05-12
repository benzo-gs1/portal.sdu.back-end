import { Schema, mongo } from "mongoose";
import CreditsSchema from "./credits";
import Department from "./department";

const CoursesSchema = new Schema({
	prefix: String,
	language: {
    type: String,
    default: "en",
    enum: ["en", "ru", "kz"],
	},
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true
	},
	code: {
		type: String,
		required: true,
	},
	credits: CreditsSchema,
	description: {
		type: String,
		required: true,
	},
	prerequisites: [new mongo.ObjectID()],
	department: Department,
});

export default CoursesSchema;
