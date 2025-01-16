const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },

        name_and_surname: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        gender: {
            type: String,
            required: false,
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
        },

        additional_info: {
            type: String,
            required: false,
        }

    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;