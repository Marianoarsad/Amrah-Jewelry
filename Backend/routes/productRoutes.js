import express from 'express';
import { getProducts, filterProducts } from '../controllers/productController.js';

const router = express.Router();

// GET PRODUCTS
router.get('/getProducts', getProducts);

// GET FILTERED PRODUCTS
router.get('/search', filterProducts);

export default router;