const express = require('express');
const { showAllProducts, showProduct, similarProducts, addProduct} = require('../controllers/product');

const router = express.Router();

router.route('/').get(showAllProducts);

router.route('/:id').get(showProduct);

router.route('/').post(addProduct);

router.route('/similar-products').post(similarProducts);

module.exports = router;