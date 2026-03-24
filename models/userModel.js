const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "male", "Female", "female", "Other", "other"],
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    profilepic: {
        type: String,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        } 
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    ],
})

const User = mongoose.model("User", userSchema);

module.exports = User;