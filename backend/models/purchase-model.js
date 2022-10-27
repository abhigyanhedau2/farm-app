const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    purchases: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Cart'
    }]
});

const Purchase = new mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;