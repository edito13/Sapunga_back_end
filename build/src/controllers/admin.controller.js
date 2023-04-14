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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code, confirmCode } = req.body;
    try {
        if (!name)
            throw "Por favor, envie um nome!";
        else if (!code)
            throw "Por favor, envie um código de acesso!";
        else if (code !== confirmCode)
            throw "Os códigos não são iguais, corriga-os";
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordCrypted = yield bcrypt_1.default.hash(code, salt);
        const admin = yield admin_model_1.default.create({ name, code: passwordCrypted });
        res.json(admin);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.post("/checkLogin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code } = req.body;
    const admin = yield admin_model_1.default.findOne({ name });
    try {
        if (!admin)
            throw "Desculpa, mas não existe este administrador!";
        const checkCode = yield bcrypt_1.default.compare(code, admin.code);
        if (!checkCode)
            throw "Seu código está incorreto, envie um código de acesso certo!";
        const secret = process.env.SECRET;
        const token_admin = jsonwebtoken_1.default.sign({ id: admin._id }, secret);
        res.json({ admin, token_admin });
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield admin_model_1.default.find({});
        res.json(admins);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const admin = yield admin_model_1.default.findById(id);
        if (!admin)
            throw "Administrador não encontrado!";
        res.json(admin);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const admin = yield admin_model_1.default.findByIdAndRemove(id);
        if (!admin)
            throw "Administrador não encontrado!";
        res.json(admin);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
module.exports = (app) => app.use("/admin", router);
