const express = require('express');
const { addToCart, removeFromCart, retrieveCart } = require('../controllers/cart');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/cart/item').post(verifyToken, addToCart);

router.route('/cart/:productID').delete(verifyToken, removeFromCart);

router.route('/retrieve-cart').get(verifyToken, retrieveCart);

module.exports = router;