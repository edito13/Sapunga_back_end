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
const express_1 = require("express");
const product_model_1 = __importDefault(require("../models/product.model"));
const router = (0, express_1.Router)();
router.post("/regist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, descricao, preco, file } = req.body;
    const urlPhoto = file;
    try {
        if (!name)
            throw "O nome está incorreto";
        else if (!descricao)
            throw "A descrição está incorreta";
        else if (!preco)
            throw "O preço está incorreto";
        const product = yield product_model_1.default.create({
            urlPhoto,
            name,
            preco,
            descricao,
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(405).send({ error });
    }
}));
router.get("/selectAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({});
        res.json(products);
    }
    catch (error) {
        res.status(404).send({ error });
    }
}));
router.get("/selectOne/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield product_model_1.default.findById(id);
        res.json(products);
    }
    catch (error) {
        res.status(404).send({ error });
    }
}));
module.exports = (app) => app.use("/product", router);
