import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = model("Order", OrderSchema);

export default Order;
