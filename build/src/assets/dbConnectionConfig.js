"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Starting Dotenv config to get my credencials
dotenv_1.default.config();
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const URL = process.env.NODE_ENV === "production"
    ? `mongodb+srv://${db_user}:${db_password}@sapunga.wrmnh69.mongodb.net/sapunga?retryWrites=true&w=majority`
    : "mongodb://localhost/sapunga";
exports.default = URL;
