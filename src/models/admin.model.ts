import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  code: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = model("Admin", AdminSchema);

export default Admin;
