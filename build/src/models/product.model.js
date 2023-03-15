"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    urlPhoto: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    descricao: {
        type: String,
        require: true,
    },
    preco: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
