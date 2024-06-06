const mongoose = require('mongoose');

const Address = mongoose.model('Address', mongoose.Schema({
        house: String,
        locality: String,
        city: String,
        state: String,
        pincode: Number
}))

module.exports = Address;