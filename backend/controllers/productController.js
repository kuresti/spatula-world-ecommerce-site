/********************************
 * Required Resources
 ********************************/
const Product = require('../models/Product');
const { ObjectId } = require('mongodb');
const productId = new ObjectId(req.params.id);


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
        const db = mongodb.getDatabase().db();
        const products = await db.collection('Products').find().toArray();

        res.setHeader('Content-Type', 'application/json');
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
        const productId = new Object(req.params.id);
        const db = mongodb.getDatabase().db();
        const product = await db.collection('Products').findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/********************************
 * GET product by Products_category
 * or name
 ********************************/
const getProductsByAttribute = async (req, res) => {
    
    const { name, category } = req.query;
    const filter = {};
    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }
    if (category) {
        filter.category = { $regex: category, $options: 'i' };
    }
    
    try {
        const db = mongodb.getDatabase().db();
        const products = await db.collection('Products').find(filter).toArray();

        res.setHeader('Content-Type', 'application/json');
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