const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    quantity: {type: Number, default: 1},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    
});

module.exports = mongoose.model('Order',orderSchema);
