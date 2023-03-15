"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", require: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
