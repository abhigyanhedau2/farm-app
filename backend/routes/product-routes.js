const express = require('express');

const productControllers = require('../controllers/product-controllers');

const router = express.Router();

const { getAllProducts, getProductsByCategory, getProductById } = productControllers;

router.route('/')
    .get(getAllProducts)
    .post();    // Protect - Seller, Admin

router.route('/:productId')
    .get(getProductById)
    .patch()    // Protect - Seller, Admin
    .delete();  // Protect - Seller, Admin

router.route('/category/:category')
    .get(getProductsByCategory);

module.exports = router;