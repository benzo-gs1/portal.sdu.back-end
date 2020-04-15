import { Schema, model } from "mongoose";

const Departments = new Schema({
    _id: Schema.ObjectId,
    code: {
        type: String,
        required:true,
        unique: true,
    },
    title: {
        en:String,
        kz:String,
        ru:String,
    },
    prefixes: [{
        prefix: {
            type:String,
            required:true,
        }
    }],
    managers:[{
        _id: Schema.ObjectId,
        name: String,
    }]
}); 

const DepartmentsModel = model("departments",Departments);
export default DepartmentsModel;
