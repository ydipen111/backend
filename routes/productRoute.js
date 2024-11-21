import express from 'express';
import { createProduct, getTopProducts, productControl, removeProduct } from '../controllers/productController.js';
import { adminCheck, authCheck } from '../middleware/authCheck.js';
import { fileCheck } from '../middleware/fileCheck.js';


const router = express.Router();




router.route('/product').get(productControl).post(authCheck,adminCheck,fileCheck, createProduct);
router.route('/top5Products').get(getTopProducts, productControl);
router.route('/:id').get(removeProduct).patch().delete(removeProduct);
export default router;


