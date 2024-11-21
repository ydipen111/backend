import mongoose from "mongoose";
import Products from "../model/Products.js";
import Product from "../model/Products.js";
import fs from "fs";

export const getTopProducts = (req,res,next)=>{
    req.query.rating={gt:4.7};
    req.query.limit = 5;
    next();

};

export const productControl = async (req, res) => {
    try {
        const excludeFilter = ["sort", "page", "limit", "search", "fields"];
        const queryObj = { ...req.query };

        // Remove excluded filters from the query object
        excludeFilter.forEach((el) => delete queryObj[el]);

        // Search
        if (req.query.search) {
            queryObj.title =  { $regex: req.query.search, $options: "i" } ; // Replace 'name' with the field to search

        }

        // Convert query object to JSON string for regex replacement
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        // Initialize query with filters
        let query = Product.find(JSON.parse(queryStr));



        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(/[\s,]+/).filter(Boolean).join(' ');
             query.sort(sortBy);
        }

        // Fields (select specific fields to return)
        if (req.query.fields) {
            const fields = req.query.fields.split(/[\s,]+/).filter(Boolean).join(' ');
            query = query.select(fields);
        }

        //page,limit,skip
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        

        // Execute the query
        const response = await query.skip(skip).limit(limit);

        // Return response
        return res.status(200).json({
            message: "Query executed successfully",
            length: response.length,
            product: response,
        });
    } catch (error) {
        return res.status(400).json({ message: `${error}` });
    }
};


export const createProduct = async (req,res,next)=>{
    const {title,price,description,category,image,brand,rating,stock} = req.body;
    
    try {
        await Products.create({
            title,
            description,
            category,
            image:req.image,
            brand,
            price:Number(price),
            rating:Number(rating),
            stock:Number(stock)
        });
        return res.status(200).json({message:"product created succesfully"});
        
    } catch (error) {
        console.log(error);
        fs.unlinkSync(`./FileUpload/${req.image}`);
        return res.status(400).json({message:`${error}`});
        
        
    }
    
    }


export const removeProduct = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message:"invalid id"});

        const isExit= await Product.findById(id);

        if(!isExit) return res.status(400).json({message:"product not found"});

        await Product.findByIdAndDelete(id);

        fs.unlinkSync(`./FileUpload/${isExit.image}`,(err)=>{
            console.log(err);
            
        });
        return res.status(200).json({message:"product deleted successfully"});
        
    } catch (error) {
        console.log(error);
        // fs.unlink(`./FileUpload/${req.image}`);
        return res.status(400).json({message:`${error}`});
        
        
    }
}