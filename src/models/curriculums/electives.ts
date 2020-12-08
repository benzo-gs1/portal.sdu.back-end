import { Schema, mongo } from "mongoose";

const ElectivesSchema = new Schema({
	area: {
		type:new mongo.ObjectID(),
		required: true,
	},
	nonArea: {
		type:new mongo.ObjectID(),
		required: true,
	},
	nonTheoretical: {
		type:new mongo.ObjectID(),
		required: true,
	},
});

export default ElectivesSchema;
