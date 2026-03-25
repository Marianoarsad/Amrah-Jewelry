import express from 'express';
import { create, update, getAllActive, getFeatured } from '../controllers/productController.js';

const router = express.Router();

// GET /api/product/ - Get all active products (User Story 1)
router.get('/', getAllActive);

// GET /api/product/featured - Get featured products (User Story 2)
router.get('/featured', getFeatured);

router.post('/create', create);
router.put('/update/:id', update);

export default router;