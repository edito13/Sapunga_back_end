import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = model("Category", CategorySchema);

export default Category;
