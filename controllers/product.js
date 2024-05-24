const Product = require('../models/Product');
const User = require('../models/User')

module.exports.showAllProducts = async (req, res) => {
        const products = await Product.find({});

        res.status(200).json({
                success: true,
                products
        })
}

module.exports.showProduct = async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        res.status(200).json({
                success: true,
                product
        })
}

