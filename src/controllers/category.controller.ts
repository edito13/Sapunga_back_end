import express from "express";
import Category from "../models/category.model";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) throw "Por favor, envia um nome!";

    const category = await Category.create({ name });

    res.json(category);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json(categories);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;

  try {
    const categories = await Category.findByIdAndRemove(id);

    if (!categories) throw "Categoria não encontrada!";

    res.json(categories);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/category", router);
