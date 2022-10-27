const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }]
});

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;