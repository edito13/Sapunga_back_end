"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FavouriteSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Favourite = (0, mongoose_1.model)("Favourite", FavouriteSchema);
exports.default = Favourite;
