import express from "express";
import auth from "../middleware/auth.middleware";
import Product from "../models/product.model";
import React from "../models/react.model";

const router = express.Router();

router.post("/reactProduct", auth, async (req, res) => {
  const { productID } = req.body;

  try {
    // Checking whether the product existis
    const product = await Product.findById(productID);

    if (!product) throw "Produto não existe.";

    const react = await React.create({
      user: req.userId,
      product: productID,
    });

    if (!react) throw "Não foi possível reagir ao produto";

    res.json(react);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/selectAll", async (req, res) => {
  try {
    const reacts = await React.find({}).populate(["user", "product"]);
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/selectUserReacts", auth,async (req, res) => {
  try {
    const reacts = await React.find({user: req.userId}).populate(["user", "product"]);
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});


router.delete("/unReact", async (req, res) => {
  const { id } = req.body
  try {
    const react = await React.findByIdAndRemove(id)

    if(!react) throw 'Não foi possível desrreagir esse produto'
    
    const reacts = await React.find({}).populate(['user','product'])
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/react", router);
