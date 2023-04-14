"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    urlPhoto: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
// const preRemoveMiddleware: PreMiddlewareFunction<IProduct> = function (next) {
//   console.log(this);
//   // next();
// };
// ProductSchema.post("save", (product: IProduct) => {
//   console.log(product);
// });
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
