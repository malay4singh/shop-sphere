const User = require('../models/User');
const Address = require('../models/Address');

module.exports.getUser = async (req, res) => {
        const { userID } = req.userData;

        const user = await User.findById(userID);

        res.status(200).json({
                success: true,
                message: "Username found",
                user
        })
}

module.exports.addAddress = async (req, res) => {
        const { userID } = req.userData;
        const { house, locality, city, state, pincode } = req.body;

        const address = await Address.create({ house, locality, city, state, pincode });

        const user = await User.findById(userID);

        user.address.push(address);
        user.save();

        res.status(200).json({
                success: true,
                message: "Address saved successfully"
        })
}

module.exports.getAddress = async (req, res) => {
        const { userID } = req.userData;

        const user = await User.findById(userID).populate('address');

        res.status(200).json({
                success: true,
                message: "Address fetched successfully",
                address: user.address
        })
}