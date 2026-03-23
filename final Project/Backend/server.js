import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    credentials: true,
}));

app.use(express.static('public'));
app.use(express.json()); // PARSE JSON REQUEST BODIES
app.use(express.urlencoded({ extended: true })); // PARSE JSON REQUEST BODIES FOR FORMS

app.use('/api/auth', authRoutes); // http://localhost:8000/api/auth/ + authRoutes (/login, /register, /logout)

app.get("/", (req, res) => {
    res.status(200);
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on ${PORT}!`);
});