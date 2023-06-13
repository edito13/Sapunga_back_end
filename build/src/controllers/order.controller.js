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
const telegraf_1 = require("telegraf");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({}).populate(["user", "product"]);
        res.json(orders);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.get("/ordersUser", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({ user: req.userId }).populate([
            "user",
            "product",
        ]);
        res.json(orders);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.post("/", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productID, quantity } = req.body;
    try {
        const product = yield product_model_1.default.findById(productID);
        if (!product)
            throw "O producto não existe.";
        const orderProduct = yield order_model_1.default.create(Object.assign(Object.assign({}, req.body), { user: req.userId, product: productID, quantity }));
        if (!orderProduct)
            throw "Erro ao encomendar um produto";
        const orders = yield order_model_1.default.find({}).populate(["user", "product"]);
        const user = yield user_model_1.default.findById(req.userId);
        const ProductItem = yield product_model_1.default.findById(productID);
        const bot = new telegraf_1.Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
        bot.telegram.sendMessage(6280552591, `Nova Encomenda
      
      ${user === null || user === void 0 ? void 0 : user.name} com o seguinte endereço de e-mail ${user === null || user === void 0 ? void 0 : user.email}, acabou de encomendar o seguinte produto: ${ProductItem === null || ProductItem === void 0 ? void 0 : ProductItem.name}
    `);
        bot.telegram.sendMessage(5142203429, `Nova Encomenda
      
      ${user === null || user === void 0 ? void 0 : user.name} com o seguinte endereço de e-mail ${user === null || user === void 0 ? void 0 : user.email}, acabou de encomendar o seguinte produto: ${ProductItem === null || ProductItem === void 0 ? void 0 : ProductItem.name}
    `);
        res.status(201).json(orders);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
}));
router.delete("/", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const order = yield order_model_1.default.findByIdAndRemove(id);
        if (!order)
            throw "Encomenda não encontrada!";
        const orders = yield order_model_1.default.find({ user: req.userId }).populate([
            "user",
            "product",
        ]);
        res.json(orders);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.put("/", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, quantity } = req.body;
    try {
        const order = yield order_model_1.default.findById(id);
        const Quantity = (order === null || order === void 0 ? void 0 : order.quantity) + quantity;
        const UpdateOrderProduct = yield order_model_1.default.findByIdAndUpdate(id, {
            quantity: Quantity,
        }, { new: true });
        if (!UpdateOrderProduct)
            throw "Erro ao encomendar um produto";
        const orders = yield order_model_1.default.find({ user: req.userId }).populate([
            "user",
            "product",
        ]);
        res.json(orders);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
module.exports = (app) => app.use("/order", router);
