const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
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
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        } 
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    ],
    contact: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
    },
})

const User = mongoose.model("User", userSchema);

module.exports = User;