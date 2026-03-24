const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

const isLoggedIn = async (req, res, next) => {
    try{
        const token = req.cookies.token;

        // No token 
        if(!token){
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Unauthorized: Please log in"
                });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        let user = await userModel.findById(decodedData.id).select("-password");

        // User deleted / not found
        if(!user){
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Unauthorized: User not found!"
                });
        }

        req.user = user;

        next();
    } catch (err) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized: Invalid or expired token!"
            });
    }
}

module.exports = isLoggedIn;