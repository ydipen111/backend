import express from 'express';
import { loginUser, signupUser } from '../controllers/authController.js';
import Joi from 'joi';
import validator from 'express-joi-validation';

const router = express.Router();

const validate = validator.createValidator({});

const signInSchema = Joi.object({
    name:Joi.string().min(4).max(25).required(),
    caste:Joi.string().min(4).max(25).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(25).required(),

});

const LoginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(25).required(),

});


router.route('/login').post(validate.body(LoginSchema),loginUser);
router.route('/signup').post(validate.body(signInSchema), signupUser);
router.route('/').get((req,res)=>{
    return res.status(200).json({message:"Home page"});
})

export default router;


