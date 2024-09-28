const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { getReviews, addReview } = require('../controllers/review');

const router = express.Router();

router.route('/:id').get(getReviews);

router.route('/').post(verifyToken, addReview);

module.exports = router;