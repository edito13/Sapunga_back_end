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
exports.LocalUploadService = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const uuid_1 = require("uuid");
const node_util_1 = require("node:util");
const UPLOAD_FOLDER = "uploads";
const writeFile = (0, node_util_1.promisify)(node_fs_1.default.writeFile);
class LocalUploadService {
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res.send({ status: "error", message: "No file found." });
            }
            const extname = node_path_1.default.extname(req.file.originalname);
            const filename = `${(0, uuid_1.v4)()}.${extname}`;
            // C://users/Fran/....asias.jpg
            const fileUrl = node_path_1.default.resolve(__dirname, "..", "..", UPLOAD_FOLDER, filename);
            try {
                yield writeFile(fileUrl, req.file.buffer);
                return res.send({
                    url: this.getFullAddress(filename),
                    status: "success",
                });
            }
            catch (e) {
                return res.status(400).send({ status: "error", message: e.message });
            }
        });
    }
    getFullAddress(filename) {
        // the server address must be before that
        return `/uploads/${filename}`;
    }
}
exports.LocalUploadService = LocalUploadService;
