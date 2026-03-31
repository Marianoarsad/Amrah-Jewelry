import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    }
    , { timestamps: true }
);

export default mongoose.model('Order', orderSchema);