import Employee from "../model/Employee.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const joinRoutes=async(req,res)=>{
    const {email, password}= req.body;

    try {
        const isExistEmployee =await Employee.findOne({email:email});
        
        if (isExistEmployee) {
            const pass= bcrypt.compareSync(password, isExistEmployee.password);

            if(!pass) return res.status(400).json({message:"invalid credintial"});

            const token = jwt.sign({
                id:isExistEmployee._id,
                isAdmin:isExistEmployee.isAdmin
            },'secretKey');

            return res.status(200).json({
                token,
                fname:isExistEmployee.fulname,
                email:isExistEmployee.email,
                isAdmin:isExistEmployee.isAdmin
            });

            
        } else {
            return res.status(400).json({message:"user not found"});
        }


        
    } catch (error) {
        return res.status(400).json({message:`${error}`});
        
    }

}

export const suscriberRoutes=async (req,res)=>{
    const {fname,email,password}=req.body;

    try {
        const isExitEmployee =await Employee.findOne({email:email});

        if(isExitEmployee) return res.status(409).json({message:"user already exist"});

        const hash = bcrypt.hashSync(password, 10);
        await Employee.create({
            fname, 
            email,
            password:hash
        })
        return res.status(200).json({message:"created succesfully"});
        
    } catch (error) {
        return res.status(400).json({message:`${error}`});
        
    }
}

