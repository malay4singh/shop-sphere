const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
        try{
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                        const token = req.headers.authorization.split(" ")[1];

                        const verifiedData = jwt.verify(token, process.env.KEY);
                        req.userData = verifiedData;

                        next();
                } else {
                        throw new Error;
                }
        } catch {
                res.status(401).json({
                        success: false,
                        message: "Authorization header missing"
                })
        }
}