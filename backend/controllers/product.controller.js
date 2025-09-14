import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({}); //empty object means fetch all objects from the database.
        res.status(200).json({success: true, data: products});
    } catch (err) {
        console.log("Error fetching results from database", err)
        res.status(500).json({success: false, message: "Error fetching data from database" });
    }
}

export const createProducts = async(req, res) => {
    const product = req.body; //user will send product details in body {name, price, image_url}

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please provide all required fields: name, price, image' });};

    const newProduct = new Product(product);
    
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (err) {
        console.log("Error creating the product", err);
        res.status(500).json({success: false, message: 'Server Error'});
    }

}

export const updateProducts = async(req, res) => {
    const {id} = req.params;
    const products = req.body; // { name, price, image }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product ID' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, products, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (err) {
        res.status(500).json({success: false, message: 'Product not found or failed to update' });
    }
}

export const deleteProducts = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product ID' });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully' });
    } catch(err) {
        console.log("Error deleting the product", err);
        res.status(500).json({success: false, message: 'failed to delete or prodct not found' });
    }
}