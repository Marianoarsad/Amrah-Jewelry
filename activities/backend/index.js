import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = 3000;
dotenv.config();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/api/product', productRoutes);

app.get("/", (req, res) => {
    
    res
        .status(200)
        .json(name);

});

app.post("/login", (req, res) => {
    
    var { userName, passWord } = req.body;

    if (userName && passWord ) {

        res
            .status(200)
            .json({
                message: "Login Successfully",
                status: "Success"
            });

    } else {

        res
            .status(403)
            .json({
                message: "Invalid username or password",
                status: "failed"
            });
        
    }

});

app.listen(PORT, () => {
    connectDB();
    console.log(`server running on port ${PORT}`);
})