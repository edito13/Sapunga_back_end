import express from "express";
import Category from "../models/category.model";
import Product from "../models/product.model";

const router = express.Router();

router.post("/regist", async (req, res) => {
  const { name, describe, price, categoryID, urlPhoto } = req.body;

  try {
    if (!name) throw "Nome não enviado";
    else if (!describe) throw "Descrição não enviada";
    else if (!price) throw "Preço não enviado";
    else if (!categoryID) throw "Categoria não especificada";

    const category = await Category.findById(categoryID);

    if (!category) throw "Categoria não existe";

    const product = await Product.create({
      urlPhoto,
      name,
      price,
      describe,
      category: categoryID,
    });

    if (!product) throw "Não foi possível cadastrar o produto";

    const products = await Product.find({}).populate("category");
    res.status(201).json(products);
  } catch (error) {
    res.status(405).send({ error });
  }
});

router.get("/selectAll", async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    res.json(products);
  } catch (error) {
    res.status(404).send({ error });
  }
});

router.get("/selectOne/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id).populate("category");
    res.json(products);
  } catch (error) {
    res.status(404).send({ error });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findByIdAndRemove(id);

    if (!product) throw "Produto não encontrado!";

    res.json(product);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/product", router);
