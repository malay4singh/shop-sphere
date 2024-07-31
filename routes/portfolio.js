const express = require('express');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

router.post('/', async (req, res) => {
        const { name, phone, email, message } = req.body;

        await Portfolio.create({ name, phone, email, message });

        res.status(201).json({
                success: true
        })
})

module.exports = router;