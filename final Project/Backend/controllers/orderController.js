import Order from "../models/Order.js";

// FETCH ORDERS
export const getOrders = async (req, res) => {
    try {
        
        // FETCH ALL ORDERS 1️⃣
        const products = await Order.find();

        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE NEW ORDER
export const createOrder = async (req, res) => {
    try {
        const { firstName, lastName, email, address } = req.body

        // CREATES NEW ORDER 3️⃣
        const order = await Order.create({ firstName, lastName, email, address });
        res.status(201).json({ message: 'Order created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}