import { Schema, model } from "mongoose";

const FavouriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Favourite = model("Favourite", FavouriteSchema);

export default Favourite;
