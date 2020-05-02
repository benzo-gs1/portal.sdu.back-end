import { Schema, model } from "mongoose";
import models from "@/models/names";

const FacultiesSchema = new Schema({
  title: Object,
});

const FacultiesModel = model(models.faculties, FacultiesSchema);

export { FacultiesSchema };

export default FacultiesModel;
