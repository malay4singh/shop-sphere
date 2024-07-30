const express = require('express');
const { createOrder, verifyOrder, getOrder } = require('../controllers/order');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/order').post(verifyToken, createOrder);

router.route('/verifyPayment').post(verifyToken, verifyOrder);

router.route('/order/:id').get(verifyToken, getOrder);

module.exports = router;