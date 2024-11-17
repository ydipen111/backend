import Students from "../model/Users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const loginUser =async (req,res)=>{

    const {email,password}=req.body;

    try {
        const isExit = await Students.findOne({email:email});

        if (isExit) {
            const pass = bcrypt.compareSync(password, isExit.password);

            if(!pass) return res.status(400).json({message:'invalid credintial'})

            const token = jwt.sign({
                id:isExit._id,
                isAdmin:isExit.isAdmin
            },'secretKey');

            return res.status(200).json({
                token,
                name:isExit.name,
                email:isExit.email,
                isAdmin:isExit.isAdmin,
                message:"user succesfully login"
            })

        } else {
            return res.status(400).json({message:"user not found"});
            
        }
        
    } catch (error) {
        return res.status(400).json({message: "invalid credential"});
        
    }

}

export  const signupUser = async (req,res)=>{
    
    const {name,caste,email,password}=req.body;

    try {
        const isExitUser = await Students.findOne({email:email});

        if(isExitUser) return res.status(409).json({message:"user already exist"});


        const hash = bcrypt.hashSync(password,10);
       await Students.create({
            name,
            caste,
            email,
            password:hash
            
        });
        return res.status(200).json({message:"created succesfully"})

        
    } catch (error) {
        return res.status(400).json({message:`${error}`})

        
    }

    }