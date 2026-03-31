import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// REGISTER ROUTE
router.post('/register', register);

// LOGIN ROUTE
router.post('/login', login);

// LOGOUT ROUTE
router.post('/logout', logout);

export default router;