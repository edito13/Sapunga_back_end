import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  urlPhoto: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  describe: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      requir: true
    },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = model("Product", ProductSchema);

export default Product;
