const mongoose = require('mongoose');

const Order = mongoose.model('Order', mongoose.Schema({
        _id: String,
        products: [{
                type: mongoose.Types.ObjectId,
                ref: 'Product'
        }],
        amount: {
                type: Number,
                min: 0
        },
        payment_status: {
                type: Boolean,
                default: false
        },
        user: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
        }
}, { timestamps: true }))

module.exports = Order;