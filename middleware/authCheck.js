import jwt from 'jsonwebtoken';

export const authCheck = async (req,res, next)=>{

    const token = req.headers.authorization;
    const decode = jwt.decode(token,'token');
    console.log(decode);

    

    if(decode){
        req.id=decode.id;
        req.isAdmin=decode.isAdmin;
        next();
    }else{
        return res.status(401).json({message:"Unauthorized"});
    }
    
}

export const adminCheck = async(req,res,next)=>{
    if(req.isAdmin){
        next();
    }else{
        return res.status(401).json({message:"Unauthorized"});
    }
}