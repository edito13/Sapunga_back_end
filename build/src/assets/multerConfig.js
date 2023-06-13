"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({
//   destination: (req, file, calback) => {
//     calback(null, resolve("uploads"));
//   },
//   filename: (req, file, calback) => {
//     const time = new Date().getTime();
//     calback(null, `${time}_${file.originalname}`);
//   },
// });
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
