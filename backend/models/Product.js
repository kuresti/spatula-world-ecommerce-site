const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    description: {
        String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);