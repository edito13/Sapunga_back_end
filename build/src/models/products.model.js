"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
});
const ProductModel = mongoose_1.default.model("Products", productSchema);
exports.default = ProductModel;
