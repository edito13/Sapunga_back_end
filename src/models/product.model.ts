import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  urlPhoto: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  descricao: {
    type: String,
    require: true,
  },
  preco: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
