const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: [true, "please enter product name"],
        },

        title: {
            type: String,
            required: true,
        },

        startTime: {
            type: String,
            required: true,
            default: 0
        },

        endTime: {
            type: String,
            required: true,
            default: 0
        }

    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;