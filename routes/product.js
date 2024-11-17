import express from 'express';
import { productRoutes } from '../controllers/productController';


const router = express.Router();




router.route('/product').post(productRoutes);
// router.route('/signup').post(signupUser);
export default router;


