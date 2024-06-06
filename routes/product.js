const express = require('express');
const { showAllProducts, showProduct, similarProducts } = require('../controllers/product');

const router = express.Router();

router.route('/').get(showAllProducts);

router.route('/:id').get(showProduct);

router.route('/similar-products').post(similarProducts);

module.exports = router;