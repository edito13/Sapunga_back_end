import express from "express";
import auth from "../middleware/auth.middleware";
import Order from "../models/order.model";
import Product from "../models/product.model";
import { Telegraf } from "telegraf";
import User from "../models/user.model";

const router = express.Router();

router.get("/selectAll", async (req, res) => {
  try {
    const orders = await Order.find({}).populate(["user", "product"]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/selectOrdersUser", auth, async (req, res) => {
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

// route.post("/sms", (req, res) => {
//   const { name, phoneNumber, message } = req.body;

//   const bot = new Telegraf("6247664565:AAG7EcKWm_Zyn34drKwMsnYPpY2-lqC5_CI");
//   bot.telegram.sendMessage(
//     5142203429,
//     `
//     ${name} com o seguinte número ${phoneNumber}, acabou de mandar a seguinte mensagem: ${message}
//   `
//   );
//   res.send("Mensagem foi enviada com sucesso!");
//   // bot.start((ctx) => ctx.reply("Welcome"));
//   // bot.help((ctx) => ctx.reply("Send me a sticker"));
//   // bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
//   // bot.hears("hi", (ctx) => ctx.reply("Hey there"));
//   // bot.launch();
// });

router.post("/orderProduct", auth, async (req, res) => {
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
      5142203429,
      `#### Nova Encomenda ####

    ${user?.name} com o seguinte endereço de e-mail ${user?.email}, acabou de encomendar o seguinte produto: ${ProductItem?.name}
  `
    );

    res.status(201).json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/delete", auth, async (req, res) => {
  const { id } = req.body;

  try {
    const order = await Order.findByIdAndRemove(id);

    if (!order) throw "Encomenda não encontrada!";

    const orders = await Order.find({}).populate(["user", "product"]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/order", router);
