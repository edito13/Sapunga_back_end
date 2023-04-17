import express from "express";
import auth from "../middleware/auth.middleware";
import Product from "../models/product.model";
import Favourite from "../models/favourite.model";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { productID } = req.body;

  try {
    // Checking whether the product existis
    const product = await Product.findById(productID);

    if (!product) throw "Produto não existe.";

    const react = await Favourite.create({
      user: req.userId,
      product: productID,
    });

    if (!react) throw "Não foi possível reagir ao produto";

    const reacts = await Favourite.find({}).populate(["user", "product"]);
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const reacts = await Favourite.find({}).populate(["user", "product"]);
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/userFavourites", auth, async (req, res) => {
  try {
    const reacts = await Favourite.find({ user: req.userId }).populate([
      "user",
      "product",
    ]);
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    const react = await Favourite.findByIdAndRemove(id);

    if (!react) throw "Não foi possível desfavoritar esse produto";

    const reacts = await Favourite.find({}).populate(["user", "product"]);

    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/favourite", router);
