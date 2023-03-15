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
const order_model_1 = __importDefault(require("../models/order.model"));
const router = express_1.default.Router();
router.get("/selectAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({}).populate(["user", "product"]);
        res.json(orders);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.post("/selectOrdersUser", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        const orders = yield order_model_1.default.find({ user }).populate(["user", "product"]);
        res.json(orders);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.post("/orderProduct", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, product } = req.body;
    try {
        const orders = yield order_model_1.default.create(Object.assign(Object.assign({}, req.body), { user,
            product }));
        if (!orders)
            throw "Erro ao encomendar um produto";
        res.json(orders.populate(["user", "product"]));
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const order = yield order_model_1.default.findByIdAndRemove(id);
        if (!order)
            throw "Encomenda não encontrada!";
        res.json(order);
    }
    catch (error) {
        res.status(400).send({ error });
    }
}));
module.exports = (app) => app.use("/order", router);