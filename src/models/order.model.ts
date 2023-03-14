import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
