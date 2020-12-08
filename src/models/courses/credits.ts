import { Schema, mongo } from "mongoose";

const CreditsSchema = new Schema({
  theory: {
		type:Number,
		required: true,
	},
	practice:{
		type:Number,
		required: true,
	},
	lab:{
		type:Number,
		required: true,
	},
	ects:{
		type:Number,
		required: true,
	},
	credits:{
		type:Number,
		required: true,
	},
});

export default CreditsSchema;
