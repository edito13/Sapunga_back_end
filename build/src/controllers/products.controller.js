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
exports.selecionar_produtos = exports.cadastrar_produto = void 0;
const products_model_1 = __importDefault(require("../models/products.model"));
const cadastrar_produto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, descricao, preco } = req.body;
    const urlPhoto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        if (!name)
            throw "O nome está incorreto";
        else if (!descricao)
            throw "A descrição está incorreta";
        else if (!preco)
            "O preço está incorreto";
        const product = yield products_model_1.default.create({
            urlPhoto,
            name,
            preco,
            descricao,
        });
        res.send(product);
    }
    catch (error) {
        res.send({ status: 500, erro: error });
    }
});
exports.cadastrar_produto = cadastrar_produto;
const selecionar_produtos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_model_1.default.find({});
        res.send(products);
    }
    catch (error) {
        res.send({ status: 500, erro: error });
    }
});
exports.selecionar_produtos = selecionar_produtos;
