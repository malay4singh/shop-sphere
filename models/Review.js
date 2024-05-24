const mongoose = require('mongoose');

const Review = mongoose.model('Review', mongoose.Schema({
        rating: {
                type: Number,
                min: 0,
                max: 5
        },
        comment: String
}))

module.exports = Review;