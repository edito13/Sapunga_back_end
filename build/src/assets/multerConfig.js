"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, calback) => {
        calback(null, (0, path_1.resolve)("uploads"));
    },
    filename: (req, file, calback) => {
        const time = new Date().getTime();
        calback(null, `${time}_${file.originalname}`);
    },
});
