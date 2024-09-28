const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

module.exports.getReviews = async (req, res) => {
        const { id } = req.params;

        const product = await Product.findById(id).populate('reviews');

        res.status(200).json({
                success: true,
                reviews: product.reviews
        })
}

module.exports.addReview = async (req, res) => {
        const { userID } = req.userData;
        const { rating, comment, productID } = req.body;

        const user = await User.findById(userID);

        const review = await Review.create({ rating, comment, username: user.username });

        const product = await Product.findById(productID);

        product.reviews.push(review);
        await product.save();

        res.status(201).json({
                success: true
        })
}