const User = require('../models/User');
const Product = require('../models/Product');

module.exports.addToCart = async (req, res) => {
        const { userID } = req.userData;
        const { productID } = req.body;

        const user = await User.findById(userID);

        if (!user){
                return res.status(401).json({
                        success: false,
                        message: "User not found"
                })
        }

        const product = await Product.findById(productID);

        user.cart.push(product);
        await user.save();

        res.status(200).json({
                success: true,
                message: "Item added to cart successfully"
        })     
}

module.exports.removeFromCart = async (req, res) => {
        const { userID } = req.userData;
        const { productID } = req.params;

        const user = await User.findById(userID);

        const index = user.cart.indexOf(productID);

        if (index == -1){
                return res.status(401).json({
                        success: false,
                        message: "Item not found"
                })
        }

        user.cart.splice(index, 1);
        await user.save();

        res.status(200).json({
                success: true,
                message: "Item deleted successfully"
        })
}

module.exports.retrieveCart = async (req, res) => {
        const { userID } = req.userData;
        
        const user = await User.findById(userID).populate('cart');

        res.status(200).json({
                success: true,
                message: "Cart retrieved from database",
                cart: user.cart
        })
}