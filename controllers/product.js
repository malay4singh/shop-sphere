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

module.exports.similarProducts = async (req, res) => {
        const { category, excludeID } = req.body;
        const products = await Product.find({ category, _id: { $ne: excludeID }, });

        res.status(200).json({
                success: true,
                products
        })
}