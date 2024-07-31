const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio', mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        message: String
}))

module.exports = Portfolio;