import express from "express";
import auth from "../middleware/auth.middleware";
import Order from "../models/order.model";
import Product from "../models/product.model";

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
    const orders = await Order.find({ user: req.userId }).populate(["user", "product"]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/orderProduct", auth, async (req, res) => {
  const { productID } = req.body;

  try {
    const product = await Product.findById(productID)

    if(!product) throw 'O producto não existe.'

    const orderProduct = await Order.create({
      ...req.body,
      user: req.userId,
      product: productID,
    });

    if (!orderProduct) throw "Erro ao encomendar um produto";

    const orders = await Order.find({}).populate(["user", "product"])

    res.status(201).json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const order = await Order.findByIdAndRemove(id);

    if (!order) throw "Encomenda não encontrada!";

    res.json(order);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/order", router);
