"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    urlPhoto: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    describe: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        requir: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
