
import e from "express";
import Product from "../model/Products.js";


export const productRoutes = async (req, res) => {
    try {
        const excludesFields =['sort','page','limit'];

        const queryObj = {...req.query};
        
        excludesFields.forEach((label)=>delete queryObj[label]);

        let qStr = JSON.stringify(queryObj);

        qStr = qStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
        console.log(qStr);
        
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip =(page-1)*limit;

        const response = await Product.find(JSON.parse(qStr)).skip(skip).limit(limit);
        
        return res.status(200).json({
            length:response.length,
            Products:response});
        
    } catch (error) {
        return res.status(400).json({message:`${error}`});
        
    }
}