const express = require('express');
const { signup, login, getUser } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/get-username').get(verifyToken, getUser);

module.exports = router;