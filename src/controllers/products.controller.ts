import Product from "../models/products.model";
import { expressFunction } from "../types";

export const cadastrar_produto: expressFunction = async (req, res) => {
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
};

export const selecionar_products: expressFunction = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const selecionar_product: expressFunction = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).send({ error });
  }
};
