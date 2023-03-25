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
const category_model_1 = __importDefault(require("../models/category.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const router = express_1.default.Router();
router.post("/regist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, describe, price, categoryID, urlPhoto } = req.body;
    try {
        if (!name)
            throw "Nome não enviado";
        else if (!describe)
            throw "Descrição não enviada";
        else if (!price)
            throw "Preço não enviado";
        else if (!categoryID)
            throw 'Categoria não especificada';
        const category = yield category_model_1.default.findById(categoryID);
        if (!category)
            throw 'Categoria não existe';
        const product = yield product_model_1.default.create({
            urlPhoto,
            name,
            price,
            describe,
            category: categoryID,
        });
        if (!product)
            throw 'Não foi possível cadastrar o produto';
        const products = yield product_model_1.default.find({}).populate('category');
        res.status(201).json(products);
    }
    catch (error) {
        res.status(405).send({ error });
    }
}));
router.get("/selectAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({}).populate('category');
        res.json(products);
    }
    catch (error) {
        res.status(404).send({ error });
    }
}));
router.get("/selectOne/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield product_model_1.default.findById(id).populate('category');
        res.json(products);
    }
    catch (error) {
        res.status(404).send({ error });
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const product = yield product_model_1.default.findByIdAndRemove(id);
        if (!product)
            throw "Produto não encontrado!";
        res.json(product);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
module.exports = (app) => app.use("/product", router);
