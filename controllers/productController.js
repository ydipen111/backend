

export const productRoutes = async (req, res)=>{
    try {
        return res.status(400).json({message:"Product page"});
        
    } catch (error) {
        return res.status(400).json(   `erroror${error}`);
        
    }
}