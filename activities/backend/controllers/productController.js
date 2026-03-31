import Product from '../models/Product.js';
import mongoose from 'mongoose';

// GET ALL ACTIVE PRODUCTS
// Returns products with status: "active"
export const getAllActive = async (req, res) => {
    try {
        // Find all products where status equals "active"
        // Select only the fields needed: id, name, description, price, image, category
        const products = await Product.find({ status: "active" })
            .select("name description price image category");

        // Return the products as JSON (empty array if none exist)
        res.status(200).json(products);

    } catch (error) {
        // Return 500 error if something goes wrong
        res.status(500).json({ message: error.message });
    }
};

// GET FEATURED PRODUCTS
// Returns products marked as featured (max 10)
export const getFeatured = async (req, res) => {
    try {
        // Find products where featured equals true
        // Limit to 10 products maximum
        // Sort by featuredAt date (most recent first) if available
        const products = await Product.find({ featured: true })
            .select("name description price image category")
            .limit(10)
            .sort({ featuredAt: -1 });

        // Return the featured products as JSON
        res.status(200).json(products);

    } catch (error) {
        // Return 500 error if something goes wrong
        res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {

    try {

        const { name, slug, description, price } = req.body;
        
        const productExists = await Product.findOne({ slug });

        // CHECKING IF PRODUCT EXISTS
        if (productExists) {
            return res.status(400).json({ message: "Product already exists." })
        } 
        
        // CREATING NEW PRODUCT
        const product = await Product.create({ name, slug, description, price });

        res.status(201).json({ message: 'Product listing successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const update = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, slug, description, price } = req.body;
        
        const productExists = await Product.findById(id);

        // CHECKING IF PRODUCT DOES NOT EXIST
        if (!productExists) {
            return res.status(400).json({ message: "Product does not exist." })
        } 
        
        const productFields = {
            name,
            slug,
            description,
            price,
            updatedAt: new Date(),

        };

        const product = await Product.updateOne(
            { _id: new mongoose.Types.ObjectId(id) }, 
            { $set: productFields }
        );

        res.status(200).json({ message: 'Product updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}