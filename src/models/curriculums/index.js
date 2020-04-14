import { Schema, model, isValidObjectId, Mongoose } from "mongoose";
let Course = require('../courses');

const Curriculums = new Schema({
    _id: Schema.ObjectId,
    semester: {
        type: String,
        required: true,
        courses:[{
            type:Course,
        }],
        electives:[[{
            type:Course,
        }]],
    },
    year:{
        type: Number,
        required: true,
    },
    code:{
        type: Number,
        required: true,
        unique: true,
    },
    cipher:{
        type: Number,
        required: true,
        unique: true,
    },
    title:{
        en:String,
        kz:String,
        ru:String,
    },
    language:{
        type: String,
        default: 'en',
    },
    department:{
        type: Schema.ObjectId,

    },
    level:{
        type: Object,
        required: true,
        short:String,
        full:{
            en:String,
            kz:String,
            ru:String,    
        }
    }
});


const CurriculumsModel = model("curriculum", Curriculums);

export default CurriculumsModel;
