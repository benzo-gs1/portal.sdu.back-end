import { Schema, model } from "mongoose";
import models from "@/models/names";

const Faculties = new Schema({
  _id: Schema.ObjectId,
  title: {
    en: String,
    kz: String,
    ru: String,
  },
});

const FacultiesModel = model(models.faculties, Faculties);

export default FacultiesModel;
