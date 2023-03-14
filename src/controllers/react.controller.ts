import express from "express";
import React from "../models/react.model";

const router = express.Router();

router.get("/selectAll", async (req, res) => {
  try {
    const reacts = await React.find({}).populate(["user", "product"]);
    res.json(reacts);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = (app: any) => app.use("/react", router);
