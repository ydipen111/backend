import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
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
},{timeStamps:true});

const Employee = mongoose.model("Employee",employeeSchema);
export default Employee;