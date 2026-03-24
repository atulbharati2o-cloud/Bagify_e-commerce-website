const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
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
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    picture: {
        type: String,
    },
    gstin: String
})

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;