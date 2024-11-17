import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    caste:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    isAdmin:{
        type:Boolean, 
        default:false
    }
},{timestamps:true});

const Students = mongoose.model("Student",studentSchema);

export default Students;