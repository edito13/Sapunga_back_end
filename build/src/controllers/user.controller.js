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
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    try {
        if (user)
            throw "Já existe um usuário com este e-mail.";
        // If it´s all ok
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordCrypted = yield bcrypt_1.default.hash(password, salt);
        const userRegisted = yield user_model_1.default.create({
            name,
            email,
            password: passwordCrypted,
        });
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({ id: userRegisted._id }, secret);
        res.status(201).json({ user: userRegisted, token });
    }
    catch (error) {
        res.send({ error: error });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        res.json(users);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.get("/:id", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user)
            throw "Usuário não encontrado!";
        res.json(user);
    }
    catch (error) {
        res.status(401).send({ error });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield user_model_1.default.findByIdAndRemove(id);
        if (!user)
            throw "Usuário não encontrado";
        res.json(user);
    }
    catch (error) {
        res.status(401).send({ error });
    }
}));
router.post("/checkLogin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email }).select("+password");
    try {
        if (!user)
            throw "Este email não está cadastrado ainda";
        const checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!checkPassword)
            throw "Sua senha está incorreta, tente novamente.";
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
        res.json({ user, token });
    }
    catch (error) {
        res.send({ error: error });
    }
}));
router.post("/checkLoginGoogle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    try {
        if (!user)
            throw "Este email não está cadastrado ainda";
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
        res.json({ user, token });
    }
    catch (error) {
        res.send({ error: error });
    }
}));
// Update new datas of a specific user
router.put("Update", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
module.exports = (app) => app.use("/user", router);
