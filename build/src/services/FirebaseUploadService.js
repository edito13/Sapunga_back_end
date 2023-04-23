"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseUploadService = void 0;
const path_1 = __importDefault(require("path"));
const storage_1 = require("firebase/storage");
const uuid_1 = require("uuid");
const firebase_setup_1 = require("../config/firebase-setup");
class FirebaseUploadService {
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file)
                    throw new Error("No file found.");
                const extname = path_1.default.extname(req.file.originalname);
                const filename = `${(0, uuid_1.v4)()}${extname}`;
                const storageRef = (0, storage_1.ref)(firebase_setup_1.storage, filename);
                const metadata = {
                    contentType: req.file.mimetype,
                };
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
                const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                const fullAddress = this.getFullAddress(filename);
                const viewURL = `${fullAddress}?alt=media`;
                return res.send({
                    // url: this.getFullAddress(filename),
                    filename,
                    url: viewURL,
                    // storageRef,
                });
            }
            catch (e) {
                return res.status(400).send({ status: "error", message: e.message });
            }
        });
    }
    getFullAddress(filename) {
        const { options: { storageBucket }, } = firebase_setup_1.firebaseApp;
        // return `https://storage.googleapis.com/${storageBucket}/${filename}?alt=media`;
        const fullAddress = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(filename)}`;
        return fullAddress;
    }
}
exports.FirebaseUploadService = FirebaseUploadService;
