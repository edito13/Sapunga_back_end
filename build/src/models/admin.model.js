"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    code: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Admin = (0, mongoose_1.model)("Admin", AdminSchema);
exports.default = Admin;
