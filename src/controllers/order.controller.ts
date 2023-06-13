import express from "express";
import { Telegraf } from "telegraf";
import auth from "../middleware/auth.middleware";
import Order from "../models/order.model";
import Product from "../models/product.model";
import User from "../models/user.model";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).populate(["user", "product"]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/ordersUser", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate([
      "user",
      "product",
    ]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/", auth, async (req, res) => {
  const { productID, quantity } = req.body;

  try {
    const product = await Product.findById(productID);

    if (!product) throw "O producto não existe.";

    const orderProduct = await Order.create({
      ...req.body,
      user: req.userId,
      product: productID,
      quantity,
    });

    if (!orderProduct) throw "Erro ao encomendar um produto";

    const orders = await Order.find({}).populate(["user", "product"]);
    const user = await User.findById(req.userId);
    const ProductItem = await Product.findById(productID);

    const bot = new Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
    bot.telegram.sendMessage(
      6280552591,
      `Nova Encomenda
      
      ${user?.name} com o seguinte endereço de e-mail ${user?.email}, acabou de encomendar o seguinte produto: ${ProductItem?.name}
    `
    );
    bot.telegram.sendMessage(
      5142203429,
      `Nova Encomenda
      
      ${user?.name} com o seguinte endereço de e-mail ${user?.email}, acabou de encomendar o seguinte produto: ${ProductItem?.name}
    `
    );

    res.status(201).json(orders);
  } catch (error) {
    res.status(400).send({ error: error as string });
  }
});

router.delete("/", auth, async (req, res) => {
  const { id } = req.body;

  try {
    const order = await Order.findByIdAndRemove(id);

    if (!order) throw "Encomenda não encontrada!";

    const orders = await Order.find({ user: req.userId }).populate([
      "user",
      "product",
    ]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.put("/", auth, async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const order = await Order.findById(id);

    const Quantity = order?.quantity + quantity;

    const UpdateOrderProduct = await Order.findByIdAndUpdate(
      id,
      {
        quantity: Quantity,
      },
      { new: true }
    );

    if (!UpdateOrderProduct) throw "Erro ao encomendar um produto";

    const orders = await Order.find({ user: req.userId }).populate([
      "user",
      "product",
    ]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/order", router);
