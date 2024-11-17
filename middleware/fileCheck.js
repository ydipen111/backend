export const someware = (req,res, next)=>{
    if(req.body.email){
        return next();
    }
    return res.status(400).json({message:'file not found'})
}