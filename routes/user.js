const express = require('express');
const { getUser, addAddress, getAddress } = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/get-user').get(verifyToken, getUser);

router.route('/add-address').post(verifyToken, addAddress);

router.route('/get-address').get(verifyToken, getAddress);

module.exports = router;