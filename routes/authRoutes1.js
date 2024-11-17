import express from 'express';
import { joinRoutes, suscriberRoutes } from '../controllers/authController1.js';
import Joi from 'joi';
import validator from 'express-joi-validation';



const router = express.Router();

const validate = validator.createValidator({});

const joinSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(25).required()
})


const suscriberSchema = Joi.object({
    fname:Joi.string().min(4).max(25).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(25).required()
})

router.route('/join').post(validate.body(joinSchema),joinRoutes);

router.route('/suscriber').post(validate.body(suscriberSchema),suscriberRoutes);

export default router;