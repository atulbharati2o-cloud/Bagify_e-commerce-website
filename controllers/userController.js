const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken.js');

const registerUser = async (req, res) => {
    try{
        let { fullname, email, password, gender, contact } = req.body;

        // Check for required fields
        if([fullname, email, password, gender, contact].some( (field) => ( !field || field.trim() === "" ))){
            return res.
                status(400)
                .json({
                    success: false,
                    message: "All fields are required!"
                });
        }

        // Check if user already exists
        let user = await userModel.findOne({email});
        if(user){
            return res.
                status(400)
                .json({
                    success: false,
                    message: "User already registered!"
                });
        }

        // Hash the password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            gender,
            contact
        });

        let userObj = user.toObject();
        delete userObj.password;

        let token = generateToken(user._id);

        res.cookie("token", token, {httpOnly: true});

        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            userObj
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error registering user: " + err.message
        });
    }
};

const loginUser = async (req, res) => {
    try{
        let { email, password } = req.body;

        if([email, password].some( (field) => ( !field || field.trim() === "" ))){
            return res.
                status(400)
                .json({
                    success: false,
                    message: "Email and password are required!"
                });
        }   

        let user = await userModel.findOne({email});
        if(!user){
            return res
                .status(401)
                .json({
                    success:false,
                    message: "Invalid email or password!"
                })
        }
        
        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.
                status(401)
                .json({
                    success: false,
                    message: "Invalid email or password!"
                });
        }

        let userObj = user.toObject();
        delete userObj.password;

        let token = generateToken(user._id);
        res.cookie("token", token, {httpOnly: true});

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            user: userObj
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error logging in user: " + err.message
        });
    }
};

module.exports = { registerUser, loginUser };