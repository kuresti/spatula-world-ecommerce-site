/********************************
 * Required Resources
 ********************************/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/********************************
 * GET Routes
 ********************************/
router.get('/', productController.getAllProducts);

router.get('/search', productController.getProductsByAttribute);

router.get('/:id', productController.getProductById);

module.exports = router;