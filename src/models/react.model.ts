import { Schema, model } from "mongoose";

const ReactSchema = new Schema({
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

const React = model("React", ReactSchema);

export default React;
