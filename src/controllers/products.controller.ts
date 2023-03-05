import ProductModel from "../models/products.model";
import { expressFunction } from "../types";

export const cadastrar_produto: expressFunction = async (req, res) => {
  const { name, descricao, preco } = req.body;
  const urlPhoto = req.file?.filename;

  try {
    if (!name) throw "O nome está incorreto";
    else if (!descricao) throw "A descrição está incorreta";
    else if (!preco) throw "O preço está incorreto";

    const product = await ProductModel.create({
      urlPhoto,
      name,
      preco,
      descricao,
    });
    res.json(product);
  } catch (error) {
    res.status(405).send({ status: 500, erro: error });
  }
};

export const selecionar_produtos: expressFunction = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    res.status(404).send("Erro: " + error);
  }
};
