import { Schema, mongo } from "mongoose";

const TitleSchema = new Schema({
	title: {
		type:String,
		required: true,
	},
});

export default TitleSchema;
