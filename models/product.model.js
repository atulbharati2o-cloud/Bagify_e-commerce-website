const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
        default: "#c8a3a3"
    },
    panelcolor: {
        type: String,
        default: "#654141"
    },
    textcolor: {
        type: String,
        default: "#000000"
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;