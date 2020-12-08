import { Schema, mongo } from "mongoose";

const MainInfo = new Schema({
	status: {
		type: String,
		required: true,
		default: "Studying",
	},
});

const ContactInfo = new Schema({
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

const AdditionalsSchema = new Schema({
	user: {
		type:new mongo.ObjectID(),
		required: true,
	},
	main: MainInfo,
	contacts: ContactInfo
});

export default AdditionalsSchema;