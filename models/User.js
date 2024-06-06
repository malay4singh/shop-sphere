const mongoose = require('mongoose');

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
        roleID: {
                type: Number,
                required: true
        },
        cart: [{
                type: mongoose.Types.ObjectId,
                ref: 'Product'
        }],
        address: [{
                type: mongoose.Types.ObjectId,
                ref  : 'Address'
        }]
}))

module.exports = User;