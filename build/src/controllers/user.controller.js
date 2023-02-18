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
exports.CheckingToken = exports.CheckLogin = exports.UpdateUser = exports.DeleteUser = exports.SelectUser = exports.SelectAllUser = exports.RegistUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Create a new user
const RegistUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    try {
        if (user)
            throw "Já existe um usuário com este e-mail";
        else if (name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === "")
            throw "Há campos vazios, preencha-os!";
        else if (confirmPassword !== password)
            throw "As senhas são diferentes!";
        // If it´s all ok
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordCrypted = yield bcrypt_1.default.hash(password, salt);
        const userRegisted = yield user_model_1.default.create({
            name,
            email,
            password: passwordCrypted,
        });
        res.json({ userRegisted, msg: "Usuário criado com sucesso" });
    }
    catch (error) {
        res.status(500).send("Erro: " + error);
    }
});
exports.RegistUser = RegistUser;
// Get all users
const SelectAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        res.json(users);
    }
    catch (error) {
        res.status(500).send("Erro: " + error);
    }
});
exports.SelectAllUser = SelectAllUser;
// Get a specific user
const SelectUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.default.findById(id, "-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).send("Erro: " + error);
    }
});
exports.SelectUser = SelectUser;
// Delete a specific user
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const user = yield user_model_1.default.findOneAndRemove({ id });
        res.json(user);
    }
    catch (error) {
        res.status(500).send("Erro: " + error);
    }
});
exports.DeleteUser = DeleteUser;
// Update new datas of a specific user
const UpdateUser = (req, res) => { };
exports.UpdateUser = UpdateUser;
// Check if user exist on the database
const CheckLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    try {
        if (!user)
            throw "Este email não está cadastrado";
        else if (!password)
            throw "Precisa enviar uma senha";
        const checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!checkPassword)
            throw "Sua senha está incorreta, tente novamente.";
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
        res.json({ msg: "Login feito com sucesso", token });
    }
    catch (error) {
        res.status(500).send("Erro: " + error);
    }
});
exports.CheckLogin = CheckLogin;
const CheckingToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        res.status(500).send("Acesso negado!");
    next();
};
exports.CheckingToken = CheckingToken;
