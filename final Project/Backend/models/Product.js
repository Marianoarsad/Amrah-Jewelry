import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        size: { type: String, enum: ["Small", "Medium", "Large"] },
        price: Number
    }
    , { timestamps: true }
);

export default mongoose.model('Product', productSchema);