const mongoose = require('mongoose');
const Product = require('./Product')

const User = mongoose.model('User', mongoose.Schema({
        username: {
                type: String,
                required: true,
                unique: true
        },
        passwd: {
                type: String,
                required: true,
        },
        role_id: {
                type: Number,
                required: true
        },
        cart: [{
                type: mongoose.Types.ObjectId,
                ref: 'Product'
        }]
}))

module.exports = User;