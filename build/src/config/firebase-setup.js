"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firebaseApp = void 0;
const firebase_json_1 = __importDefault(require("./firebase.json"));
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseApp = (0, app_1.initializeApp)(firebase_json_1.default);
exports.firebaseApp = firebaseApp;
const storage = (0, storage_1.getStorage)(firebaseApp);
exports.storage = storage;
