import express from "express";
import auth from "../middleware/auth.middleware";
import Order from "../models/order.model";

const router = express.Router();

router.get("/selectAll", async (req, res) => {
  try {
    const orders = await Order.find({}).populate(["user", "product"]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/selectOrdersUser", auth, async (req, res) => {
  const { user } = req.body;

  try {
    const orders = await Order.find({ user }).populate(["user", "product"]);

    res.json(orders);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/orderProduct", auth, async (req, res) => {
  const { user, product } = req.body;

  try {
    const orders = await Order.create({
      ...req.body,
      user,
      product,
    });

    if (!orders) throw "Erro ao encomendar um produto";

    res.json(orders.populate(["user", "product"]));
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
