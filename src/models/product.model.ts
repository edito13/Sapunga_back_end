import { Schema, model, Document, PreMiddlewareFunction } from "mongoose";

interface IProduct extends Document {
  urlPhoto: string;
  name: string;
  describe: string;
  price: number;
  category: Schema.Types.ObjectId;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  urlPhoto: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// const preRemoveMiddleware: PreMiddlewareFunction<IProduct> = function (next) {
//   console.log(this);
//   // next();
// };

// ProductSchema.post("save", (product: IProduct) => {
//   console.log(product);
// });

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
