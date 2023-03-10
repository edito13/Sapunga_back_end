import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  urlPhoto: {
    type: String,
    require: true
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
});

const ProductModel = mongoose.model("Products", productSchema);

export default ProductModel;
