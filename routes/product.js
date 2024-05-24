const express = require('express');
const { showAllProducts, showProduct, addToCart } = require('../controllers/product');

const router = express.Router();

router.route('/').get(showAllProducts);

router.route('/:id').get(showProduct);

module.exports = router;