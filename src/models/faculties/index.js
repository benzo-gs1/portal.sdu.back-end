import { Schema, model } from "mongoose";

const Faculties = new Schema({
    _id: Schema.ObjectId,
    title: {
        en:String,
        kz:String,
        ru:String,
    },
});

const FacultiesModel = model("faculties", Faculties);

export default FacultiesModel;
