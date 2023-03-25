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
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const product_model_1 = __importDefault(require("../models/product.model"));
const react_model_1 = __importDefault(require("../models/react.model"));
const router = express_1.default.Router();
router.post("/reactProduct", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID } = req.body;
    try {
        // Checking whether the product existis
        const product = yield product_model_1.default.findById(productID);
        if (!product)
            throw "Produto não existe.";
        const react = yield react_model_1.default.create({
            user: req.userId,
            product: productID,
        });
        if (!react)
            throw "Não foi possível reagir ao produto";
        res.json(react);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.get("/selectAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reacts = yield react_model_1.default.find({}).populate(["user", "product"]);
        res.json(reacts);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.get("/selectUserReacts", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reacts = yield react_model_1.default.find({ user: req.userId }).populate(["user", "product"]);
        res.json(reacts);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.delete("/unReact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const react = yield react_model_1.default.findByIdAndRemove(id);
        if (!react)
            throw 'Não foi possível desrreagir esse produto';
        const reacts = yield react_model_1.default.find({}).populate(['user', 'product']);
        res.json(reacts);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
module.exports = (app) => app.use("/react", router);
