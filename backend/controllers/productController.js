/********************************
 * Required Resources
 * 11/13/25 Got errors on running backend
 * asked chatGPT 5 what was wrong with code
 * found out I was mixing mongoose and native
 * driver. I have a model so fixed
 * controller to be mongoose only.
 ********************************/
const Product = require('../models/Product');
//const { ObjectId } = require('mongodb');
const mongoose = require('mongoose'); 



/********************************
 * Get All Products
 * 11/12/25 Pasted code into chatGPT 5
 * to check for issues. In my original
 * code I used a mix of await and then.
 * AI suggested this is redundant, so I 
 * switched to using only await.
 ********************************/
const getAllProducts = async (req, res) => {
    try {
        const products = await  Product.find().sort({ createdAt: -1 });

        //res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/********************************
 * Get Product By ID
 * Continued with the same pattern 
 * of using await.
 ********************************/
const getProductById = async (req, res) => {
    try {

        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        //const productId = new Object(req.params.id);
        //const db = mongodb.getDatabase().db();
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //res.setHeader('Content-Type', 'application/json');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/********************************
 * GET product by Products_category
 * or name
 ********************************/
const escapeRegex = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const getProductsByAttribute = async (req, res) => {
    try {
        const { name, category } = req.query;
        const filter = {};

        if (name) {
            filter.name = { $regex: new RegExp(escapeRegex(name), 'i') };
        }
        if (category) {
            filter.category = { $regex: new RegExp(escapeRegex(category), 'i') };
        }

        const products = await Product.find(filter).sort({ name: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByAttribute
}