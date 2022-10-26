const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({});

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;