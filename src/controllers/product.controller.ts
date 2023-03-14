import { Router } from "express";
import Product from "../models/product.model";

const router = Router();

router.post("/regist", async (req, res) => {
  const { name, descricao, preco, file } = req.body;
  const urlPhoto = file;

  try {
    if (!name) throw "O nome está incorreto";
    else if (!descricao) throw "A descrição está incorreta";
    else if (!preco) throw "O preço está incorreto";

    const product = await Product.create({
      urlPhoto,
      name,
      preco,
      descricao,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(405).send({ error });
  }
});

router.get("/selectAll", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).send({ error });
  }
});

router.get("/selectOne/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id);
    res.json(products);
  } catch (error) {
    res.status(404).send({ error });
  }
});

module.exports = (app: any) => app.use("/product", router);
