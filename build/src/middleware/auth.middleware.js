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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader)
            throw "Token não enviado!";
        const parts = authHeader.split(" ");
        if (!(parts.length === 2))
            throw "Erro no Token";
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme))
            throw "Token mal formatado";
        const secret = process.env.SECRET;
        const { id } = jsonwebtoken_1.default.verify(token, secret);
        const user = yield user_model_1.default.findById(id, "-password");
        if (!user)
            throw "Token Inválido!";
        req.userId = id;
        next();
    }
    catch (error) {
        res.status(401).send({ error });
    }
});
exports.default = auth;
