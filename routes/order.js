const express = require('express');
const { createOrder, verifyOrder } = require('../controllers/order');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/order').post(verifyToken, createOrder);

router.route('/verifyPayment').post(verifyToken, verifyOrder);

module.exports = router;