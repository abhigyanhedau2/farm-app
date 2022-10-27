const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        totalProductsPrice: {
            type: Number
        },
        totalProductsQuantity: {
            type: Number
        }
    }],
    totalItems: {
        type: Number
    },
    cartPrice: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Cart = new mongoose.model('Cart', cartSchema);

module.exports = Cart;