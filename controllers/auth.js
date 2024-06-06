const jwt = require('jsonwebtoken')
const User = require('../models/User');
const jwt_secret=process.env.KEY;

module.exports.signup = async (req, res) =>{
        const { username, passwd, roleID } = req.body;

        await User.create({ username, passwd, roleID });

        res.status(201).json({
                success: true
        })
}

module.exports.login = async (req, res) =>{
        const { username, passwd } = req.body;
        
        const user = await User.findOne({ username });

        if (!user || user.passwd != passwd){
                return res.status(401).json({
                        success: true,
                        msg: "Invalid Credentials"
                })
        }

        const payload = {
                userID: user._id,
                roleID: user.roleID
        }

        const token = jwt.sign(payload, jwt_secret, { expiresIn: '24h' });

        res.status(200).json({
                success: true,
                msg: "Login successful",
                token
        })
}