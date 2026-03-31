import express from 'express';
import { getOrders, createOrder } from '../controllers/orderController.js';

const router = express.Router();

// FETCH ORDER
router.get('/orders', getOrders);

// CREATE ORDER
router.post('/create-order', createOrder);

export default router;