const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Product = require('../models/product-model');

// GET the list of all products
const getAllProducts = catchAsync(async (req, res, next) => {

    // GET all the products from DB
    const products = await Product.find();

    // If no products are found
    if (!products || products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            results: 0,
            data: {
                products: []
            },
            message: 'No products found.'
        });
    }

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });

});

// GET the list of products categorically
const getProductsByCategory = catchAsync(async (req, res, next) => {

    const requestedCategory = req.params.category;

    // GET all the products from DB
    const products = await Product.find({ category: requestedCategory });

    // If no products are found
    if (!products || products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            results: 0,
            data: {
                products: []
            },
            message: `No products found for the category ${requestedCategory}`
        });
    }

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });

});

// GET a product from product id
const getProductById = catchAsync(async (req, res, next) => {

    const productId = req.params.productId;

    const product = await Product.findById(productId);

    // If no products is found by the requested productId
    if (!product) {
        return res.status(404).json({
            status: 'fail',
            results: 0,
            message: 'No product found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });

});

module.exports = { getAllProducts, getProductsByCategory, getProductById };