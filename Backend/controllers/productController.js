import Product from "../models/Product.js";

// FETCH PRODUCTS
export const getProducts = async (req, res) => {
    try {
        // FETCH ALL PRODUCTS 1️⃣
        const products = await Product.find();

        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const filterProducts = async (req, res) => {
    try {

        // FETCH FILTERED PRODUCTS 1️⃣
        const filteredProducts = await Product.find(req.query);
        console.log(filteredProducts);

        console.log(`filteredProducts: ${filteredProducts}`);
        res.status(200).json(filteredProducts);
        
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}